const { Pool } = require('pg');
 
  class MusicService {
    constructor() {
      this._pool = new Pool();
    }
   
    async getMusic(userId) {
        const query = {
            text: `
              SELECT DISTINCT "Playlists".id, 
                              "Playlists".name, 
                              users.username, 
                              "Collaborations".id AS collaboration_id
              FROM "Playlists"
              JOIN users ON "Playlists".owner = users.id
              LEFT JOIN "Collaborations" ON "Playlists".id = "Collaborations".playlist_id
              WHERE "Playlists".owner = $1
                 OR "Collaborations".user_id = $1
              LIMIT $2`,
            values: [userId],
        };
      
        const result = await this._pool.query(query);
        return result.rows[0];
    }
}

module.exports = MusicService;