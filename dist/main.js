/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"overallDOM\": () => (/* binding */ overallDOM)\n/* harmony export */ });\nconst overallDOM = () => {\n\n    const board = document.querySelectorAll('.left');\n\n    let horiz = true;\n\n    let currentShip = \"Carrier\";\n\n    let currentLen = 5;\n\n    const validChecker = (square, len) => {\n        if(horiz){\n            if((square%10 + len) > 10) return 10 - (square%10 + len);\n            for(let i = 0; i < len; i++){\n                if(board[square+i].classList.contains('ship')) return 0;\n            }\n            return 1;\n        } else{\n            if((Math.floor(square/10) + len) > 10) return 10 - (Math.floor(square/10) + len);\n            for(let i = 0; i < len; i++){\n                if(board[square+i*10].classList.contains('ship')) return 0;\n            }\n            return 1;\n        }\n    }\n\n    const hoverFunc = (e) => {\n        let highlight = currentLen;\n        let start = parseInt(e.target.classList[1])\n        let validity = validChecker(start, currentLen);\n        let classToAdd;\n        if(validity < 0){\n            highlight -= validity;\n            classToAdd = 'invalid';\n        } else if (validity===0) classToAdd = 'invalid';\n        else classToAdd = 'valid';\n        \n        if(horiz){\n            for(let i = 0; i < highlight; i++){\n                board[start+i].classList.add(classToAdd);\n            }\n        } else{\n            for(let i = 0; i < highlight; i++){\n                board[start+i*10].classList.add(classToAdd);\n            }\n        }\n    }\n\n    const unhoverFunc = (e) => {\n        const start = parseInt(e.target.classList[1])\n        if(horiz){\n            for(let i = 0; i < currentLen; i++){\n                if(start+i < 100){\n                    board[start+i].classList.remove('valid');\n                    board[start+i].classList.remove('invalid');\n                }\n            }\n        } else{\n            for(let i = 0; i < currentLen; i++){\n                if(start+i*10 < 100){\n                    board[start+i*10].classList.remove('valid');\n                    board[start+i*10].classList.remove('invalid');\n                }\n            }\n        }\n    }\n\n    const shipPlace = (e) => {\n        if(validChecker(parseInt(e.target.classList[1]), currentLen) === 1){\n            let start = parseInt(e.target.classList[1]);\n            if(horiz){\n                for(let i = 0; i < currentLen; i++){\n                    board[start+i].classList.add('ship');\n                }\n            } else {\n                for(let i = 0; i < currentLen; i++){\n                    board[start+i*10].classList.add('ship');\n                }\n            }\n            changeShip();\n        }\n    }\n\n    const changeShip = () => {\n        if(currentShip===\"Carrier\"){\n            currentShip = \"Battleship\";\n            currentLen = 4;\n        } else if (currentShip===\"Battleship\"){\n            currentShip = \"Cruiser\";\n            currentLen = 3;\n        } else if (currentShip===\"Cruiser\"){\n            currentShip = \"Submarine\";\n        } else if (currentShip===\"Submarine\"){\n            currentShip = \"Destroyer\";\n            currentLen = 2;\n        } else{\n            for(const sq of board){\n                sq.onclick = '';\n                sq.onmouseover = '';\n                sq.onmouseout = '';\n            }\n        }\n    }\n\n    const addListeners = () => {\n        for(const sq of board){\n            sq.onclick = shipPlace;\n            sq.onmouseover = hoverFunc;\n            sq.onmouseout = unhoverFunc;\n        }\n        window.addEventListener('keyup', rSwitches);\n    }\n\n    const rSwitches = (e) => {\n        if (e.key===\"r\") switchHoriz();\n    }\n\n    const getShip = () => {\n        return currentShip;\n    }\n\n    const setShip = (pr) => {\n        currentShip = pr;\n    }\n\n    const getHoriz = () => {\n        return horiz;\n    }\n\n    const switchHoriz = () => {\n        horiz = !horiz;\n    }\n\n    const getLen = () => {\n        return currentLen;\n    }\n\n    const setLen = (len) => {\n        currentLen = len;\n    }\n\n    return {validChecker, getShip, getHoriz, getLen, hoverFunc, unhoverFunc, shipPlace, setShip, switchHoriz, setLen, addListeners}\n    \n}\n\n\n\n\n//# sourceURL=webpack://odin-battle/./src/DOM.js?");

/***/ }),

/***/ "./src/gameplay.js":
/*!*************************!*\
  !*** ./src/gameplay.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AIPlayer\": () => (/* binding */ AIPlayer),\n/* harmony export */   \"Ship\": () => (/* binding */ Ship),\n/* harmony export */   \"gameboard\": () => (/* binding */ gameboard),\n/* harmony export */   \"humanPlayer\": () => (/* binding */ humanPlayer),\n/* harmony export */   \"shipCreator\": () => (/* binding */ shipCreator)\n/* harmony export */ });\nconst Ship = (pr_name, pr_length) => {\n    const name = pr_name;\n    const length = pr_length;\n    let squares = {};\n    let assigned = false;\n    let sunk = false;\n\n    const hit = (sq) => {\n        if (sq in squares){\n            squares[sq] = \"hit\";\n        }\n        if(sinkCheck()) return \"sunk\";\n        else return \"not sunk\";\n    }\n\n    const sinkCheck = () => {\n        for (const key in squares){\n            if (squares[key]===\"unhit\") return false;\n        }\n        sunk = true;\n        return true;\n    }\n\n    const squareCreate = (posArray) => {\n        for(const position of posArray){\n            squares[position] = \"unhit\";\n        }\n        assigned = true;\n    }\n\n    const isSunk = () => {\n        return sunk;\n    }\n\n    const isAssigned = () => {\n        return assigned;\n    }\n\n    return {name, length, squares, hit, squareCreate, isSunk, isAssigned}\n}\n\n\nconst shipCreator = () => {\n    let out = {};\n    out[\"Carrier\"] = Ship(\"Carrier\", 5);\n    out[\"Battleship\"] = Ship(\"Battleship\", 4);\n    out[\"Cruiser\"] = Ship(\"Cruiser\", 3);\n    out[\"Submarine\"] = Ship(\"Submarine\", 3);\n    out[\"Destroyer\"] = Ship(\"Destroyer\", 2);\n    return out;\n}\n\nconst gameboard = () => {\n\n    let allShips = shipCreator();\n\n    let placeBoard = new Array(100).fill(null);\n\n    let hitBoard = new Array(100).fill(\"unhit\");\n\n    const availCreate = () => {\n        let ret = new Set();\n        for (let i = 0; i < 100; i++){\n            ret.add(i);\n        }\n        return ret;\n    }\n\n    let availMoves = availCreate();\n\n    const receiveAttack = (pos) => {\n        out = [pos];\n        hitBoard[pos] = \"hit\";\n        if(placeBoard[pos] !== null){\n            out.push(\"hit\");\n            const stat = allShips[placeBoard[pos]].hit();\n            if(stat === \"sunk\"){\n                out.push(allShips[placeBoard[pos]]);\n                let loss = true;\n                for(const ship of allShips){\n                    if(!ship.isSunk()) loss = false;\n                }\n                if(loss){\n                    out.push(\"Gameover\");\n                } else{\n                    out.push(\"In Play\");\n                }\n            } else{\n                out.push(null);\n                out.push(\"In Play\");\n            }\n        } else{\n            out.push(\"miss\");\n            out.push(null);\n            out.push(\"In Play\");\n        }\n        return out;\n    }\n\n    const shipPlacer = (ship, pos_arr) => {\n        for (const pos of pos_arr){\n            placeBoard[pos] = ship;\n        }\n        allShips[ship].squareCreate(pos_arr);\n    }\n\n    return {allShips, placeBoard, hitBoard, availMoves, receiveAttack, shipPlacer}\n}\n\n\nconst humanPlayer = (pr_AI) => {\n    const otherPlayer = pr_AI;\n\n    let board = gameboard();\n\n    let isTurn = true;\n\n    const mainMover = (square) => {\n        if(isTurn){\n            iTurn = false;\n\n            let attack_result = otherPlayer.board.receiveAttack(square);\n\n            if(attack_result[2]===\"Gameover\"){\n                return [attack_result, [null, null, null, null]];\n            }else {\n                let received_result = board.receiveAttack(otherPlayer.AIAtttack());\n                isTurn = true;\n                return [attack_result, received_result];\n            }\n        } \n    }\n\n    const retOther = () => {\n        return otherPlayer;\n    }\n\n    return {board, mainMover, retOther}\n}\n\nconst AIPlayer = () => {\n    let board = gameboard();\n\n    const AIAtttack = () => {\n        let iterNum = Math.floor(Math.random()*board.availMoves.size);\n        let count = 0;\n        for(const item of board.availMoves){\n            if(iterNum === count){\n                board.availMoves.delete(item);\n                return item;\n            }\n            count++;\n        }\n    }\n\n    return {board, AIAtttack}\n}\n\n\n\n//# sourceURL=webpack://odin-battle/./src/gameplay.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init */ \"./src/init.js\");\n/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameplay */ \"./src/gameplay.js\");\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n\n\n\n\n(0,_init__WEBPACK_IMPORTED_MODULE_0__.populator)();\n\nlet AI = (0,_gameplay__WEBPACK_IMPORTED_MODULE_1__.AIPlayer)();\nlet human = (0,_gameplay__WEBPACK_IMPORTED_MODULE_1__.humanPlayer)();\n\nlet DOMob = (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.overallDOM)();\nDOMob.addListeners();\n\n//# sourceURL=webpack://odin-battle/./src/index.js?");

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"populator\": () => (/* binding */ populator)\n/* harmony export */ });\nconst populator = () => {\n    const left = document.querySelector('.leftboard');\n    for(let i = 0; i < 10; i++){\n        const row = document.createElement('div');\n        row.className = \"Left row\";\n        for(let j = 0; j < 10; j++){\n            const sq = document.createElement('div');\n            sq.className = `left ${i*10+j}`;\n            row.appendChild(sq);\n        }\n        left.appendChild(row);\n    }\n\n    const right = document.querySelector('.rightboard');\n    for(let i = 0; i < 10; i++){\n        const row = document.createElement('div');\n        row.className = \"Right row\";\n        for(let j = 0; j < 10; j++){\n            const sq = document.createElement('div');\n            sq.className = `right ${i*10+j}`;\n            row.appendChild(sq);\n        }\n        right.appendChild(row);\n    }\n}\n\n\n\n//# sourceURL=webpack://odin-battle/./src/init.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;