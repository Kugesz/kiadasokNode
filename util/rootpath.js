import path from "path";
import { fileURLToPath } from "url";

export default path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
