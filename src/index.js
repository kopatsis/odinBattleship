import { populator } from "./init";
import {AIPlayer, humanPlayer, gameboard, shipCreator, Ship} from "./gameplay";

populator();

let AI = AIPlayer();
let human = humanPlayer();

