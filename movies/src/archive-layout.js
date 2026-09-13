// World coordinates are shared by the renderer, collision system and floor plan.
// Each twelve-film gallery has a permanent place along one continuous concourse.
export const ROOM_CAPACITY = 12;
export const ROW_SPACING = 24;
export const CORRIDOR_HALF_WIDTH = 5;
export const ROOM_OUTER_WALL = 21;
export const ROOM_HALF_DEPTH = 10;

export function viewingYear(film) {
  return /^\d{4}-\d{2}-\d{2}$/.test(film.watched || "")
    ? film.watched.slice(0, 4)
    : "Undated";
}

export function createArchiveLayout(films) {
  const watched = films.filter((film) => film.status === "watched");
  const byYear = new Map();
  for (const film of watched) {
    const year = viewingYear(film);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(film);
  }
  const years = [...byYear.keys()].sort((a, b) =>
    a === "Undated" ? 1 : b === "Undated" ? -1 : Number(b) - Number(a),
  );
  const rooms = [];
  const appendRooms = (id, title, collection, type, year) => {
    const sorted = [...collection].sort((a, b) =>
      (b.watched || "").localeCompare(a.watched || ""),
    );
    const count = Math.max(1, Math.ceil(sorted.length / ROOM_CAPACITY));
    for (let i = 0; i < count; i++) {
      rooms.push({
        id: `${id}-${i}`,
        title,
        type,
        year,
        part: i + 1,
        parts: count,
        subtitle:
          count > 1
            ? `Gallery ${i + 1} of ${count}`
            : type === "year"
              ? "A year in your life"
              : "Something to look forward to",
        films: sorted.slice(i * ROOM_CAPACITY, (i + 1) * ROOM_CAPACITY),
      });
    }
  };
  years.forEach((year) =>
    appendRooms(`year-${year}`, year, byYear.get(year), "year", year),
  );
  appendRooms(
    "watchlist",
    "Coming attractions",
    films.filter((f) => f.status === "watchlist"),
    "watchlist",
  );
  // Even a new collection begins in a real building, with somewhere to linger.
  while (rooms.length < 4 || rooms.length % 2) {
    const first = !rooms.some((r) => r.type === "lounge");
    rooms.push({
      id: first ? "lounge" : `future-${rooms.length}`,
      title: first ? "The reflection lounge" : "The next chapter",
      subtitle: first
        ? "Take a seat. Stay a while."
        : "Room for memories yet to come",
      type: first ? "lounge" : "future",
      films: [],
      part: 1,
      parts: 1,
    });
  }
  rooms.forEach((room, index) => {
    room.index = index;
    room.row = Math.floor(index / 2);
    room.side = index % 2 === 0 ? -1 : 1;
    room.x = room.side * 13;
    room.z = -room.row * ROW_SPACING - 6;
    room.label =
      room.type === "year"
        ? `${room.title}${room.parts > 1 ? ` · Gallery ${room.part}` : ""}`
        : room.title;
  });
  const rows = rooms.length / 2;
  return {
    rooms,
    years,
    byYear,
    rows,
    watchedCount: watched.length,
    minZ: -(rows - 1) * ROW_SPACING - 18,
    maxZ: 19,
  };
}

export function roomAtPosition(layout, x, z) {
  if (Math.abs(x) < CORRIDOR_HALF_WIDTH) return null;
  const row = Math.round((-z - 6) / ROW_SPACING);
  const room = layout.rooms[row * 2 + (x > 0 ? 1 : 0)];
  return room &&
    Math.abs(z - room.z) < ROOM_HALF_DEPTH &&
    Math.abs(x) < ROOM_OUTER_WALL
    ? room
    : null;
}

export function isWalkable(layout, x, z) {
  const radius = 0.35;
  if (z < layout.minZ + radius || z > layout.maxZ - radius) return false;
  const ax = Math.abs(x);
  if (ax < CORRIDOR_HALF_WIDTH - radius) return true;
  const row = Math.round((-z - 6) / ROW_SPACING);
  const room = layout.rooms[row * 2 + (x > 0 ? 1 : 0)];
  if (!room) return false;
  const dz = Math.abs(z - room.z);
  if (ax < CORRIDOR_HALF_WIDTH + radius + 0.3 && dz < 4.15) return true;
  return (
    ax > CORRIDOR_HALF_WIDTH + radius &&
    ax < ROOM_OUTER_WALL - radius &&
    dz < ROOM_HALF_DEPTH - radius
  );
}

// Locations on the back, outside and front walls; rotations face into the room.
export function posterSlots(room) {
  const slots = [];
  for (let i = 0; i < 4; i++)
    slots.push({ x: room.side * (7.2 + i * 3.75), z: room.z - 9.75, yaw: 0 });
  for (let i = 0; i < 4; i++)
    slots.push({
      x: room.side * 20.75,
      z: room.z - 6.75 + i * 4.5,
      yaw: (-room.side * Math.PI) / 2,
    });
  for (let i = 0; i < 4; i++)
    slots.push({
      x: room.side * (18.45 - i * 3.75),
      z: room.z + 9.75,
      yaw: Math.PI,
    });
  return slots;
}
