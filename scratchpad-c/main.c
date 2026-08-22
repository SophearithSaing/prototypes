#include <glib/gstdio.h>
#include <gtk/gtk.h>
#include <pango/pangocairo.h>
#include <string.h>

#ifndef G_OS_WIN32
#include <fontconfig/fontconfig.h>
#else
#include <windows.h>
#endif

#define APP_ID "com.example.Scratchpad"
#define AUTOSAVE_DELAY_MS 450
#define FONT_RESOURCE_PATH                                                    \
  "/com/example/Scratchpad/fonts/JetBrainsMono-Regular.ttf"
#define FONT_FILENAME "JetBrainsMono-Regular.ttf"

typedef struct _ScratchpadApp ScratchpadApp;

typedef struct {
  ScratchpadApp *app;
  char *id;
  char *title;
  char *draft_path;
  char *export_path;
  GtkWidget *page;
  GtkWidget *view;
  GtkWidget *title_label;
  GtkTextBuffer *buffer;
  guint autosave_source;
} ScratchpadTab;

struct _ScratchpadApp {
  GtkApplication *application;
  GtkWidget *window;
  GtkWidget *notebook;
  GtkWidget *status_label;
  GPtrArray *tabs;
  char *data_dir;
  char *session_path;
  guint next_note_number;
};

typedef struct {
  ScratchpadApp *app;
  char *tab_id;
} TabRequest;

static void save_session(ScratchpadApp *app);
static ScratchpadTab *new_tab(ScratchpadApp *app, const char *title,
                              const char *id, const char *export_path,
                              const char *initial_text);

static void set_status(ScratchpadApp *app, const char *text) {
  gtk_label_set_text(GTK_LABEL(app->status_label), text);
}

static char *buffer_text(ScratchpadTab *tab) {
  GtkTextIter start;
  GtkTextIter end;

  gtk_text_buffer_get_bounds(tab->buffer, &start, &end);
  return gtk_text_buffer_get_text(tab->buffer, &start, &end, FALSE);
}

static gboolean write_tab_draft(ScratchpadTab *tab) {
  g_autofree char *text = buffer_text(tab);
  g_autoptr(GError) error = NULL;

  if (!g_file_set_contents(tab->draft_path, text, -1, &error)) {
    g_warning("Could not auto-save %s: %s", tab->draft_path, error->message);
    set_status(tab->app, "Auto-save failed");
    return FALSE;
  }

  set_status(tab->app, "Autosaved");
  return TRUE;
}

static gboolean autosave_cb(gpointer user_data) {
  ScratchpadTab *tab = user_data;

  tab->autosave_source = 0;
  write_tab_draft(tab);
  return G_SOURCE_REMOVE;
}

static void buffer_changed_cb(GtkTextBuffer *buffer, gpointer user_data) {
  ScratchpadTab *tab = user_data;
  (void)buffer;

  if (tab->autosave_source != 0)
    g_source_remove(tab->autosave_source);

  set_status(tab->app, "Saving…");
  tab->autosave_source = g_timeout_add(AUTOSAVE_DELAY_MS, autosave_cb, tab);
}

static ScratchpadTab *current_tab(ScratchpadApp *app) {
  int page = gtk_notebook_get_current_page(GTK_NOTEBOOK(app->notebook));

  if (page < 0)
    return NULL;
  return g_object_get_data(
      G_OBJECT(gtk_notebook_get_nth_page(GTK_NOTEBOOK(app->notebook), page)),
      "scratchpad-tab");
}

static ScratchpadTab *find_tab(ScratchpadApp *app, const char *id) {
  for (guint i = 0; i < app->tabs->len; i++) {
    ScratchpadTab *tab = g_ptr_array_index(app->tabs, i);
    if (g_strcmp0(tab->id, id) == 0)
      return tab;
  }
  return NULL;
}

static void tab_free(ScratchpadTab *tab) {
  if (tab->autosave_source != 0)
    g_source_remove(tab->autosave_source);
  g_clear_pointer(&tab->id, g_free);
  g_clear_pointer(&tab->title, g_free);
  g_clear_pointer(&tab->draft_path, g_free);
  g_clear_pointer(&tab->export_path, g_free);
  g_free(tab);
}

static void save_session(ScratchpadApp *app) {
  g_autoptr(GKeyFile) key_file = g_key_file_new();
  g_autoptr(GError) error = NULL;
  g_autofree char *data = NULL;
  gsize data_length = 0;

  g_key_file_set_integer(key_file, "session", "count", (int)app->tabs->len);
  g_key_file_set_integer(
      key_file, "session", "active",
      gtk_notebook_get_current_page(GTK_NOTEBOOK(app->notebook)));

  for (guint i = 0; i < app->tabs->len; i++) {
    ScratchpadTab *tab = g_ptr_array_index(app->tabs, i);
    g_autofree char *group = g_strdup_printf("tab-%u", i);

    g_key_file_set_string(key_file, group, "id", tab->id);
    g_key_file_set_string(key_file, group, "title", tab->title);
    if (tab->export_path != NULL)
      g_key_file_set_string(key_file, group, "export-path", tab->export_path);
  }

  data = g_key_file_to_data(key_file, &data_length, NULL);
  if (!g_file_set_contents(app->session_path, data, (gssize)data_length,
                           &error))
    g_warning("Could not save session: %s", error->message);
}

static void update_title(ScratchpadTab *tab, const char *title) {
  g_free(tab->title);
  tab->title = g_strdup(title);
  gtk_label_set_text(GTK_LABEL(tab->title_label), title);
  save_session(tab->app);
}

static void save_to_path(ScratchpadTab *tab, const char *path) {
  g_autofree char *text = buffer_text(tab);
  g_autofree char *basename = NULL;
  g_autoptr(GError) error = NULL;

  if (!g_file_set_contents(path, text, -1, &error)) {
    g_autofree char *message =
        g_strdup_printf("Could not save: %s", error->message);
    set_status(tab->app, message);
    return;
  }

  g_free(tab->export_path);
  tab->export_path = g_strdup(path);
  basename = g_path_get_basename(path);
  update_title(tab, basename);
  write_tab_draft(tab);
  set_status(tab->app, "Saved to file");
}

static void tab_request_free(TabRequest *request) {
  g_free(request->tab_id);
  g_free(request);
}

static gboolean dialog_was_dismissed(const GError *error) {
  return error != NULL &&
         (g_error_matches(error, GTK_DIALOG_ERROR,
                          GTK_DIALOG_ERROR_CANCELLED) ||
          g_error_matches(error, GTK_DIALOG_ERROR,
                          GTK_DIALOG_ERROR_DISMISSED));
}

static void save_dialog_response_cb(GObject *source_object,
                                    GAsyncResult *result, gpointer user_data) {
  TabRequest *request = user_data;
  g_autoptr(GError) error = NULL;
  g_autoptr(GFile) file = gtk_file_dialog_save_finish(
      GTK_FILE_DIALOG(source_object), result, &error);
  ScratchpadTab *tab = find_tab(request->app, request->tab_id);

  if (file != NULL && tab != NULL) {
    g_autofree char *path = g_file_get_path(file);

    if (path != NULL)
      save_to_path(tab, path);
    else
      set_status(request->app, "Only local files can be saved");
  } else if (error != NULL && !dialog_was_dismissed(error)) {
    g_autofree char *message =
        g_strdup_printf("Could not open save dialog: %s", error->message);
    set_status(request->app, message);
  }

  tab_request_free(request);
}

static void show_save_dialog(ScratchpadApp *app, ScratchpadTab *tab) {
  g_autoptr(GtkFileDialog) dialog = gtk_file_dialog_new();
  TabRequest *request;

  gtk_file_dialog_set_title(dialog, "Save note");
  gtk_file_dialog_set_accept_label(dialog, "Save");
  gtk_file_dialog_set_initial_name(dialog, tab->title);

  request = g_new0(TabRequest, 1);
  request->app = app;
  request->tab_id = g_strdup(tab->id);
  gtk_file_dialog_save(dialog, GTK_WINDOW(app->window), NULL,
                       save_dialog_response_cb, request);
}

static void save_action_cb(GSimpleAction *action, GVariant *parameter,
                           gpointer user_data) {
  ScratchpadApp *app = user_data;
  ScratchpadTab *tab = current_tab(app);
  (void)action;
  (void)parameter;

  if (tab == NULL)
    return;
  if (tab->export_path != NULL)
    save_to_path(tab, tab->export_path);
  else
    show_save_dialog(app, tab);
}

static void save_as_action_cb(GSimpleAction *action, GVariant *parameter,
                              gpointer user_data) {
  ScratchpadApp *app = user_data;
  ScratchpadTab *tab = current_tab(app);
  (void)action;
  (void)parameter;

  if (tab != NULL)
    show_save_dialog(app, tab);
}

static void delete_tab(ScratchpadApp *app, ScratchpadTab *tab) {
  int page = gtk_notebook_page_num(GTK_NOTEBOOK(app->notebook), tab->page);

  if (page >= 0)
    gtk_notebook_remove_page(GTK_NOTEBOOK(app->notebook), page);
  g_ptr_array_remove(app->tabs, tab);
  if (g_unlink(tab->draft_path) != 0 &&
      g_file_test(tab->draft_path, G_FILE_TEST_EXISTS))
    g_warning("Could not delete draft %s", tab->draft_path);
  tab_free(tab);

  if (app->tabs->len == 0)
    new_tab(app, NULL, NULL, NULL, NULL);
  save_session(app);
  set_status(app, "Tab removed");
}

static void close_dialog_response_cb(GObject *source_object,
                                     GAsyncResult *result, gpointer user_data) {
  TabRequest *request = user_data;
  g_autoptr(GError) error = NULL;
  int response = gtk_alert_dialog_choose_finish(
      GTK_ALERT_DIALOG(source_object), result, &error);
  ScratchpadTab *tab = find_tab(request->app, request->tab_id);

  if (response == 1 && tab != NULL)
    delete_tab(request->app, tab);
  else if (error != NULL && !dialog_was_dismissed(error)) {
    g_autofree char *message =
        g_strdup_printf("Could not show confirmation: %s", error->message);
    set_status(request->app, message);
  }

  tab_request_free(request);
}

static void request_close_tab(ScratchpadApp *app, ScratchpadTab *tab) {
  const char *buttons[] = {"Cancel", "Remove Tab", NULL};
  g_autoptr(GtkAlertDialog) dialog =
      gtk_alert_dialog_new("Remove “%s”?", tab->title);
  TabRequest *request;

  gtk_alert_dialog_set_detail(
      dialog,
      "Its auto-saved draft will be deleted. Any file you explicitly saved "
      "elsewhere will remain.");
  gtk_alert_dialog_set_buttons(dialog, buttons);
  gtk_alert_dialog_set_cancel_button(dialog, 0);
  gtk_alert_dialog_set_default_button(dialog, 0);

  request = g_new0(TabRequest, 1);
  request->app = app;
  request->tab_id = g_strdup(tab->id);
  gtk_alert_dialog_choose(dialog, GTK_WINDOW(app->window), NULL,
                          close_dialog_response_cb, request);
}

static void close_button_clicked_cb(GtkButton *button, gpointer user_data) {
  ScratchpadTab *tab = user_data;
  (void)button;
  request_close_tab(tab->app, tab);
}

static void close_tab_action_cb(GSimpleAction *action, GVariant *parameter,
                                gpointer user_data) {
  ScratchpadApp *app = user_data;
  ScratchpadTab *tab = current_tab(app);
  (void)action;
  (void)parameter;

  if (tab != NULL)
    request_close_tab(app, tab);
}

static void select_relative_tab(ScratchpadApp *app, int offset) {
  int page_count = gtk_notebook_get_n_pages(GTK_NOTEBOOK(app->notebook));
  int current =
      gtk_notebook_get_current_page(GTK_NOTEBOOK(app->notebook));

  if (page_count < 2 || current < 0)
    return;

  gtk_notebook_set_current_page(GTK_NOTEBOOK(app->notebook),
                                (current + offset + page_count) % page_count);

  ScratchpadTab *tab = current_tab(app);
  if (tab != NULL)
    gtk_widget_grab_focus(tab->view);
  save_session(app);
}

static void next_tab_action_cb(GSimpleAction *action, GVariant *parameter,
                               gpointer user_data) {
  (void)action;
  (void)parameter;
  select_relative_tab(user_data, 1);
}

static void previous_tab_action_cb(GSimpleAction *action, GVariant *parameter,
                                   gpointer user_data) {
  (void)action;
  (void)parameter;
  select_relative_tab(user_data, -1);
}

static ScratchpadTab *new_tab(ScratchpadApp *app, const char *title,
                              const char *id, const char *export_path,
                              const char *initial_text) {
  ScratchpadTab *tab = g_new0(ScratchpadTab, 1);
  GtkWidget *scroller = gtk_scrolled_window_new();
  GtkWidget *view = gtk_text_view_new();
  GtkWidget *tab_box = gtk_box_new(GTK_ORIENTATION_HORIZONTAL, 5);
  GtkWidget *close_button =
      gtk_button_new_from_icon_name("window-close-symbolic");
  g_autofree char *generated_title = NULL;
  int page;

  tab->app = app;
  tab->id = id != NULL ? g_strdup(id) : g_uuid_string_random();
  if (title == NULL) {
    generated_title = g_strdup_printf("Note %u", app->next_note_number++);
    title = generated_title;
  }
  tab->title = g_strdup(title);
  tab->draft_path = g_build_filename(app->data_dir, "tabs", tab->id, NULL);
  tab->export_path = g_strdup(export_path);
  tab->page = scroller;
  tab->view = view;
  tab->buffer = gtk_text_view_get_buffer(GTK_TEXT_VIEW(view));
  tab->title_label = gtk_label_new(tab->title);

  gtk_widget_set_hexpand(view, TRUE);
  gtk_widget_set_vexpand(view, TRUE);
  gtk_text_view_set_wrap_mode(GTK_TEXT_VIEW(view), GTK_WRAP_WORD_CHAR);
  gtk_text_view_set_left_margin(GTK_TEXT_VIEW(view), 20);
  gtk_text_view_set_right_margin(GTK_TEXT_VIEW(view), 20);
  gtk_text_view_set_top_margin(GTK_TEXT_VIEW(view), 18);
  gtk_text_view_set_bottom_margin(GTK_TEXT_VIEW(view), 18);
  gtk_scrolled_window_set_child(GTK_SCROLLED_WINDOW(scroller), view);

  gtk_widget_set_tooltip_text(close_button, "Remove tab");
  gtk_button_set_has_frame(GTK_BUTTON(close_button), FALSE);
  gtk_box_append(GTK_BOX(tab_box), tab->title_label);
  gtk_box_append(GTK_BOX(tab_box), close_button);

  g_object_set_data(G_OBJECT(scroller), "scratchpad-tab", tab);
  page =
      gtk_notebook_append_page(GTK_NOTEBOOK(app->notebook), scroller, tab_box);
  gtk_notebook_set_tab_reorderable(GTK_NOTEBOOK(app->notebook), scroller, TRUE);
  g_ptr_array_add(app->tabs, tab);

  if (initial_text != NULL)
    gtk_text_buffer_set_text(tab->buffer, initial_text, -1);
  g_signal_connect(tab->buffer, "changed", G_CALLBACK(buffer_changed_cb), tab);
  g_signal_connect(close_button, "clicked", G_CALLBACK(close_button_clicked_cb),
                   tab);

  gtk_notebook_set_current_page(GTK_NOTEBOOK(app->notebook), page);
  gtk_widget_grab_focus(view);

  if (initial_text == NULL)
    write_tab_draft(tab);
  save_session(app);
  return tab;
}

static void new_tab_action_cb(GSimpleAction *action, GVariant *parameter,
                              gpointer user_data) {
  ScratchpadApp *app = user_data;
  (void)action;
  (void)parameter;
  new_tab(app, NULL, NULL, NULL, NULL);
  set_status(app, "New tab");
}

static void page_reordered_cb(GtkNotebook *notebook, GtkWidget *child,
                              guint page_num, gpointer user_data) {
  ScratchpadApp *app = user_data;
  ScratchpadTab *moved = g_object_get_data(G_OBJECT(child), "scratchpad-tab");
  guint old_index = 0;
  (void)notebook;

  while (old_index < app->tabs->len &&
         g_ptr_array_index(app->tabs, old_index) != moved)
    old_index++;
  if (old_index < app->tabs->len) {
    g_ptr_array_remove_index(app->tabs, old_index);
    g_ptr_array_insert(app->tabs, page_num, moved);
    save_session(app);
  }
}

static gboolean window_close_request_cb(GtkWindow *window, gpointer user_data) {
  ScratchpadApp *app = user_data;
  (void)window;

  for (guint i = 0; i < app->tabs->len; i++) {
    ScratchpadTab *tab = g_ptr_array_index(app->tabs, i);
    if (tab->autosave_source != 0) {
      g_source_remove(tab->autosave_source);
      tab->autosave_source = 0;
    }
    write_tab_draft(tab);
  }
  save_session(app);
  return FALSE;
}

static void load_session(ScratchpadApp *app) {
  g_autoptr(GKeyFile) key_file = g_key_file_new();
  g_autoptr(GError) error = NULL;
  int count;
  int active;

  if (!g_key_file_load_from_file(key_file, app->session_path, G_KEY_FILE_NONE,
                                 &error)) {
    if (!g_error_matches(error, G_FILE_ERROR, G_FILE_ERROR_NOENT))
      g_warning("Could not load session: %s", error->message);
    new_tab(app, NULL, NULL, NULL, NULL);
    return;
  }

  count = g_key_file_get_integer(key_file, "session", "count", NULL);
  active = g_key_file_get_integer(key_file, "session", "active", NULL);
  for (int i = 0; i < count; i++) {
    g_autofree char *group = g_strdup_printf("tab-%d", i);
    g_autofree char *id = g_key_file_get_string(key_file, group, "id", NULL);
    g_autofree char *title =
        g_key_file_get_string(key_file, group, "title", NULL);
    g_autofree char *export_path =
        g_key_file_get_string(key_file, group, "export-path", NULL);
    g_autofree char *draft_path = NULL;
    g_autofree char *text = NULL;

    if (id == NULL || title == NULL)
      continue;
    draft_path = g_build_filename(app->data_dir, "tabs", id, NULL);
    if (!g_file_get_contents(draft_path, &text, NULL, NULL))
      text = g_strdup("");
    new_tab(app, title, id, export_path, text);
  }

  if (app->tabs->len == 0)
    new_tab(app, NULL, NULL, NULL, NULL);
  else if (active >= 0 && active < (int)app->tabs->len)
    gtk_notebook_set_current_page(GTK_NOTEBOOK(app->notebook), active);
  set_status(app, "Drafts restored");
}

static gboolean install_bundled_font(void) {
  g_autoptr(GError) error = NULL;
  g_autoptr(GBytes) font_bytes = g_resources_lookup_data(
      FONT_RESOURCE_PATH, G_RESOURCE_LOOKUP_FLAGS_NONE, &error);
  g_autofree char *font_dir = NULL;
  g_autofree char *font_path = NULL;
  g_autofree char *existing_data = NULL;
  gsize font_length;
  gsize existing_length = 0;
  const void *font_data;
  PangoFontMap *font_map;

  if (font_bytes == NULL) {
    g_warning("Could not read bundled font: %s", error->message);
    return FALSE;
  }

  font_data = g_bytes_get_data(font_bytes, &font_length);
  font_dir = g_build_filename(g_get_user_cache_dir(), "scratchpad", "fonts",
                              NULL);
  font_path = g_build_filename(font_dir, FONT_FILENAME, NULL);

  if (g_mkdir_with_parents(font_dir, 0700) != 0) {
    g_warning("Could not create font cache directory %s", font_dir);
    return FALSE;
  }

  if (!g_file_get_contents(font_path, &existing_data, &existing_length, NULL) ||
      existing_length != font_length ||
      memcmp(existing_data, font_data, font_length) != 0) {
    g_clear_pointer(&existing_data, g_free);
    if (!g_file_set_contents(font_path, font_data, (gssize)font_length,
                             &error)) {
      g_warning("Could not cache bundled font: %s", error->message);
      return FALSE;
    }
  }

  font_map = pango_cairo_font_map_get_default();

#if PANGO_VERSION_CHECK(1, 56, 0)
  g_clear_error(&error);
  if (!pango_font_map_add_font_file(font_map, font_path, &error)) {
    g_warning("Could not load bundled font: %s", error->message);
    return FALSE;
  }
#elif defined(G_OS_WIN32)
  g_autofree gunichar2 *wide_path = g_utf8_to_utf16(font_path, -1, NULL, NULL,
                                                     &error);
  if (wide_path == NULL ||
      AddFontResourceExW((const WCHAR *)wide_path, FR_PRIVATE | FR_NOT_ENUM,
                         NULL) == 0) {
    g_warning("Could not load bundled font on Windows");
    return FALSE;
  }
  pango_font_map_changed(font_map);
#else
  FcConfig *font_config = FcConfigGetCurrent();
  if (font_config == NULL ||
      !FcConfigAppFontAddFile(font_config, (const FcChar8 *)font_path)) {
    g_warning("Could not load bundled font through Fontconfig");
    return FALSE;
  }
  FcConfigBuildFonts(font_config);
  pango_font_map_changed(font_map);
#endif

  return TRUE;
}

static void install_css(void) {
  static const char css[] =
      "notebook > header tab { padding: 7px 10px; }"
      "textview, textview text { font-family: \"JetBrains Mono\", monospace; "
      "font-size: 12pt; }"
      ".status { opacity: .62; font-size: 9pt; padding: 5px 10px; }";
  GtkCssProvider *provider = gtk_css_provider_new();

  gtk_css_provider_load_from_string(provider, css);
  gtk_style_context_add_provider_for_display(
      gdk_display_get_default(), GTK_STYLE_PROVIDER(provider),
      GTK_STYLE_PROVIDER_PRIORITY_APPLICATION);
  g_object_unref(provider);
}

static void install_app_icon(GtkWindow *window) {
  GtkIconTheme *icon_theme =
      gtk_icon_theme_get_for_display(gtk_widget_get_display(GTK_WIDGET(window)));

  gtk_icon_theme_add_resource_path(icon_theme,
                                   "/com/example/Scratchpad/icons");
  gtk_window_set_icon_name(window, APP_ID);
}

static void add_action(ScratchpadApp *app, const char *name, GCallback callback,
                       const char *accelerator) {
  GSimpleAction *action = g_simple_action_new(name, NULL);
  g_autofree char *detailed_name = g_strdup_printf("app.%s", name);

  g_signal_connect(action, "activate", callback, app);
  g_action_map_add_action(G_ACTION_MAP(app->application), G_ACTION(action));
  if (accelerator != NULL) {
    const char *accelerators[] = {accelerator, NULL};
    gtk_application_set_accels_for_action(app->application, detailed_name,
                                          accelerators);
  }
  g_object_unref(action);
}

static void activate_cb(GtkApplication *application, gpointer user_data) {
  ScratchpadApp *app = user_data;
  GtkWidget *main_box;
  GtkWidget *header;
  GtkWidget *title;
  GtkWidget *new_button;
  GtkWidget *save_button;
  GtkWidget *menu_button;
  GMenu *menu;

  if (app->window != NULL) {
    gtk_window_present(GTK_WINDOW(app->window));
    return;
  }

  install_bundled_font();
  app->window = gtk_application_window_new(application);
  install_app_icon(GTK_WINDOW(app->window));
  gtk_window_set_title(GTK_WINDOW(app->window), "scratchpad");
  gtk_window_set_default_size(GTK_WINDOW(app->window), 900, 650);

  header = gtk_header_bar_new();
  title = gtk_label_new("scratchpad");
  gtk_widget_add_css_class(title, "title");
  gtk_header_bar_set_title_widget(GTK_HEADER_BAR(header), title);

  new_button = gtk_button_new_from_icon_name("tab-new-symbolic");
  gtk_widget_set_tooltip_text(new_button, "New tab (Ctrl+N)");
  gtk_actionable_set_action_name(GTK_ACTIONABLE(new_button), "app.new-tab");
  gtk_header_bar_pack_start(GTK_HEADER_BAR(header), new_button);

  save_button = gtk_button_new_from_icon_name("document-save-symbolic");
  gtk_widget_set_tooltip_text(save_button, "Save to file (Ctrl+S)");
  gtk_actionable_set_action_name(GTK_ACTIONABLE(save_button), "app.save");
  gtk_header_bar_pack_end(GTK_HEADER_BAR(header), save_button);

  menu = g_menu_new();
  g_menu_append(menu, "New Tab", "app.new-tab");
  g_menu_append(menu, "Save", "app.save");
  g_menu_append(menu, "Save As…", "app.save-as");
  g_menu_append(menu, "Next Tab", "app.next-tab");
  g_menu_append(menu, "Previous Tab", "app.previous-tab");
  g_menu_append(menu, "Remove Tab…", "app.close-tab");
  menu_button = gtk_menu_button_new();
  gtk_menu_button_set_icon_name(GTK_MENU_BUTTON(menu_button),
                                "open-menu-symbolic");
  gtk_menu_button_set_menu_model(GTK_MENU_BUTTON(menu_button),
                                 G_MENU_MODEL(menu));
  gtk_widget_set_tooltip_text(menu_button, "Main menu");
  gtk_header_bar_pack_end(GTK_HEADER_BAR(header), menu_button);
  g_object_unref(menu);
  gtk_window_set_titlebar(GTK_WINDOW(app->window), header);

  main_box = gtk_box_new(GTK_ORIENTATION_VERTICAL, 0);
  app->notebook = gtk_notebook_new();
  gtk_widget_set_hexpand(app->notebook, TRUE);
  gtk_widget_set_vexpand(app->notebook, TRUE);
  gtk_notebook_set_scrollable(GTK_NOTEBOOK(app->notebook), TRUE);
  gtk_notebook_set_show_border(GTK_NOTEBOOK(app->notebook), FALSE);
  g_signal_connect(app->notebook, "page-reordered",
                   G_CALLBACK(page_reordered_cb), app);

  app->status_label = gtk_label_new("Autosaved");
  gtk_label_set_xalign(GTK_LABEL(app->status_label), 1.0f);
  gtk_widget_add_css_class(app->status_label, "status");
  gtk_box_append(GTK_BOX(main_box), app->notebook);
  gtk_box_append(GTK_BOX(main_box), app->status_label);
  gtk_window_set_child(GTK_WINDOW(app->window), main_box);

  g_signal_connect(app->window, "close-request",
                   G_CALLBACK(window_close_request_cb), app);
  install_css();
  load_session(app);
  gtk_window_present(GTK_WINDOW(app->window));
}

static ScratchpadApp *scratchpad_app_new(void) {
  ScratchpadApp *app = g_new0(ScratchpadApp, 1);
  g_autofree char *tabs_dir = NULL;

#if GLIB_CHECK_VERSION(2, 74, 0)
  app->application = gtk_application_new(APP_ID, G_APPLICATION_DEFAULT_FLAGS);
#else
  app->application = gtk_application_new(APP_ID, G_APPLICATION_FLAGS_NONE);
#endif
  app->tabs = g_ptr_array_new();
  app->data_dir = g_build_filename(g_get_user_data_dir(), "scratchpad", NULL);
  app->session_path = g_build_filename(app->data_dir, "session.ini", NULL);
  app->next_note_number = 1;
  tabs_dir = g_build_filename(app->data_dir, "tabs", NULL);
  if (g_mkdir_with_parents(tabs_dir, 0700) != 0)
    g_warning("Could not create data directory %s", tabs_dir);

  add_action(app, "new-tab", G_CALLBACK(new_tab_action_cb), "<Control>n");
  add_action(app, "save", G_CALLBACK(save_action_cb), "<Control>s");
  add_action(app, "save-as", G_CALLBACK(save_as_action_cb),
             "<Control><Shift>s");
  add_action(app, "next-tab", G_CALLBACK(next_tab_action_cb), "<Control>Tab");
  add_action(app, "previous-tab", G_CALLBACK(previous_tab_action_cb),
             "<Control><Shift>Tab");
  add_action(app, "close-tab", G_CALLBACK(close_tab_action_cb), "<Control>w");
  g_signal_connect(app->application, "activate", G_CALLBACK(activate_cb), app);
  return app;
}

static void scratchpad_app_free(ScratchpadApp *app) {
  for (guint i = 0; i < app->tabs->len; i++)
    tab_free(g_ptr_array_index(app->tabs, i));
  g_ptr_array_free(app->tabs, TRUE);
  g_clear_object(&app->application);
  g_free(app->data_dir);
  g_free(app->session_path);
  g_free(app);
}

int main(int argc, char **argv) {
  ScratchpadApp *app = scratchpad_app_new();
  int status = g_application_run(G_APPLICATION(app->application), argc, argv);

  scratchpad_app_free(app);
  return status;
}
