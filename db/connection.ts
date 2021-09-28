import { Sequelize } from "sequelize";

const db = new Sequelize("node_dev", "root", "icgoadvvjy", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
