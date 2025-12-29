
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Button from '../ui/Button';
import { 
    SparkIcon, NeuronIcon, 
    PLAYER1_COLOR_BG_GALACTIC, PLAYER1_COLOR_BORDER_GALACTIC, PLAYER1_TEXT_COLOR_GALACTIC, PLAYER1_GLOW_GALACTIC,
    PLAYER2_COLOR_BG_GALACTIC, PLAYER2_COLOR_BORDER_GALACTIC, PLAYER2_TEXT_COLOR_GALACTIC, PLAYER2_GLOW_GALACTIC,
    GRAVITY_LINE_BORDER_COLOR_GALACTIC, GRAVITY_LINE_BG_PULSE_COLOR_GALACTIC,
    NEURON_PARTICIPATION_REWARD
} from '../../constants';
import { DropDirection } from '../../types';

const ROWS = 8;
const COLS = 7;
const PLAYER1 = 1;
const PLAYER2 = 2;

const INITIAL_TOTAL_TIME = 120; // 2 minutes per player
const TURN_TIME_LIMIT = 20; // 20 seconds per turn
const GRAVITY_LINE_ROW = 3; // Ligne de gravité index 3 (entre rangée 4 et 5 sur 8)
const DEFAULT_SPARK_WAGER = 15; 

interface PieceCoords { r: number; c: number; }

interface GravityFourGameProps {
  gameName: string;
  onExitGame: () => void;
}

const MemoizedButton = React.memo(Button);

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const GravityFourGame: React.FC<GravityFourGameProps> = React.memo(({ gameName, onExitGame }) => {
  const createEmptyBoard = useCallback((): (null | number)[][] => Array(ROWS).fill(null).map(() => Array(COLS).fill(null)), []);

  const [board, setBoard] = useState<(null | number)[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<number>(PLAYER1);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null | 'draw'>(null);
  const [winReason, setWinReason] = useState<string>('');
  
  const [droppingPiece, setDroppingPiece] = useState<{ col: number, finalRow: number, tempRow: number, player: number, direction: DropDirection } | null>(null);
  const [winningLine, setWinningLine] = useState<PieceCoords[] | null>(null);

  const [player1TotalTime, setPlayer1TotalTime] = useState(INITIAL_TOTAL_TIME);
  const [player2TotalTime, setPlayer2TotalTime] = useState(INITIAL_TOTAL_TIME);
  const [currentTurnTime, setCurrentTurnTime] = useState(TURN_TIME_LIMIT);
  
  const timerIntervalRef = useRef<number | null>(null);
  const turnTimerIntervalRef = useRef<number | null>(null);

  const [player1Sparks, setPlayer1Sparks] = useState(100); 
  const [player2Sparks, setPlayer2Sparks] = useState(100);
  const [sparkWager] = useState(DEFAULT_SPARK_WAGER);
  const sparksPool = sparkWager * 2;

  const [player1Neurons, setPlayer1Neurons] = useState(1500);
  const [player2Neurons, setPlayer2Neurons] = useState(1500);

  const getPlayerName = useCallback((player: number) => (player === PLAYER1 ? "Player 1" : "Player 2"), []);

  const stopAllTimers = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (turnTimerIntervalRef.current) clearInterval(turnTimerIntervalRef.current);
    timerIntervalRef.current = null;
    turnTimerIntervalRef.current = null;
  }, []);

  const endGame = useCallback((gameWinner: number | null | 'draw', reason: string) => {
    stopAllTimers();
    setGameOver(true);
    setWinner(gameWinner);
    setWinReason(reason);

    setPlayer1Neurons(n => n + NEURON_PARTICIPATION_REWARD);
    setPlayer2Neurons(n => n + NEURON_PARTICIPATION_REWARD);

    if (gameWinner === PLAYER1) {
      setPlayer1Sparks(s => s + sparksPool);
    } else if (gameWinner === PLAYER2) {
      setPlayer2Sparks(s => s + sparksPool);
    } else if (gameWinner === 'draw') {
      setPlayer1Sparks(s => s + sparkWager); 
      setPlayer2Sparks(s => s + sparkWager); 
    }
  }, [stopAllTimers, sparksPool, sparkWager]);

  useEffect(() => {
    if (gameOver || droppingPiece) return;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = window.setInterval(() => {
      if (currentPlayer === PLAYER1) {
        setPlayer1TotalTime(prev => {
          if (prev <= 1) {
            endGame(PLAYER2, `${getPlayerName(PLAYER1)} ran out of total time!`);
            return 0;
          }
          return prev - 1;
        });
      } else {
        setPlayer2TotalTime(prev => {
          if (prev <= 1) {
            endGame(PLAYER1, `${getPlayerName(PLAYER2)} ran out of total time!`);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [currentPlayer, gameOver, droppingPiece, endGame, getPlayerName]);

  useEffect(() => {
    if (gameOver || droppingPiece) return;
    if (turnTimerIntervalRef.current) clearInterval(turnTimerIntervalRef.current);
    
    setCurrentTurnTime(TURN_TIME_LIMIT); 
    turnTimerIntervalRef.current = window.setInterval(() => {
      setCurrentTurnTime(prev => {
        if (prev <= 1) {
          endGame(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1, `${getPlayerName(currentPlayer)} time's up!`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (turnTimerIntervalRef.current) clearInterval(turnTimerIntervalRef.current); };
  }, [currentPlayer, gameOver, droppingPiece, endGame, getPlayerName]);

  const checkWin = useCallback((currentBoard: (null | number)[][]): PieceCoords[] | null => {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            const player = currentBoard[r][c];
            if (player && player === currentBoard[r][c+1] && player === currentBoard[r][c+2] && player === currentBoard[r][c+3]) {
                return [{r,c}, {r,c:c+1}, {r,c:c+2}, {r,c:c+3}];
            }
        }
    }
    for (let c = 0; c < COLS; c++) {
        for (let r = 0; r <= ROWS - 4; r++) {
            const player = currentBoard[r][c];
            if (player && player === currentBoard[r+1][c] && player === currentBoard[r+2][c] && player === currentBoard[r+3][c]) {
                return [{r,c}, {r:r+1,c}, {r:r+2,c}, {r:r+3,c}];
            }
        }
    }
    for (let r = 0; r <= ROWS - 4; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            const player = currentBoard[r][c];
            if (player && player === currentBoard[r+1][c+1] && player === currentBoard[r+2][c+2] && player === currentBoard[r+3][c+3]) {
                return [{r,c}, {r:r+1,c:c+1}, {r:r+2,c:c+2}, {r:r+3,c:c+3}];
            }
        }
    }
    for (let r = 3; r < ROWS; r++) {
        for (let c = 0; c <= COLS - 4; c++) {
            const player = currentBoard[r][c];
            if (player && player === currentBoard[r-1][c+1] && player === currentBoard[r-2][c+2] && player === currentBoard[r-3][c+3]) {
                 return [{r,c}, {r:r-1,c:c+1}, {r:r-2,c:c+2}, {r:r-3,c:c+3}];
            }
        }
    }
    return null;
  }, []);

  const checkDraw = useCallback((currentBoard: (null | number)[][]): boolean => {
    return currentBoard.every(row => row.every(cell => cell !== null));
  }, []);

  const handleDrop = useCallback((col: number, direction: DropDirection) => {
    if (gameOver || droppingPiece) return;

    let finalRow = -1;
    if (direction === 'top') {
        for (let i = GRAVITY_LINE_ROW; i >= 0; i--) { 
            if (board[i][col] === null) {
                finalRow = i;
                break;
            }
        }
    } else {
        for (let i = GRAVITY_LINE_ROW + 1; i < ROWS; i++) { 
            if (board[i][col] === null) {
                finalRow = i;
                break;
            }
        }
    }
    
    if (finalRow === -1) return;

    setDroppingPiece({ 
        col, 
        finalRow, 
        tempRow: (direction === 'top' ? 0 : ROWS - 1), 
        player: currentPlayer, 
        direction 
    });
  }, [board, currentPlayer, gameOver, droppingPiece]);

  useEffect(() => {
    if (!droppingPiece) return;
    const animationSpeed = 40;
    const interval = setInterval(() => {
      setDroppingPiece(prev => {
        if (!prev) { clearInterval(interval); return null; }
        const nextTempRow = prev.tempRow + (prev.direction === 'top' ? 1 : -1);
        const arrived = (prev.direction === 'top' && nextTempRow >= prev.finalRow) || 
                        (prev.direction === 'bottom' && nextTempRow <= prev.finalRow);

        if (arrived) {
          clearInterval(interval);
          const newBoard = board.map(row => [...row]);
          newBoard[prev.finalRow][prev.col] = prev.player;
          setBoard(newBoard);
          const winningInfo = checkWin(newBoard);
          if (winningInfo) {
            endGame(prev.player, `${getPlayerName(prev.player)} won!`);
            setWinningLine(winningInfo);
          } else if (checkDraw(newBoard)) {
            endGame('draw', "It's a draw!");
          } else {
            setCurrentPlayer(prev.player === PLAYER1 ? PLAYER2 : PLAYER1);
          }
          return null;
        }
        return { ...prev, tempRow: nextTempRow }; 
      });
    }, animationSpeed);
    return () => clearInterval(interval);
  }, [board, droppingPiece, checkWin, checkDraw, endGame, getPlayerName]);

  const resetGame = useCallback(() => {
    stopAllTimers();
    setBoard(createEmptyBoard());
    setCurrentPlayer(PLAYER1);
    setGameOver(false);
    setWinner(null);
    setWinReason('');
    setDroppingPiece(null);
    setWinningLine(null);
    setPlayer1TotalTime(INITIAL_TOTAL_TIME);
    setPlayer2TotalTime(INITIAL_TOTAL_TIME);
    setCurrentTurnTime(TURN_TIME_LIMIT);
    setPlayer1Sparks(prev => Math.max(0, prev - sparkWager)); 
    setPlayer2Sparks(prev => Math.max(0, prev - sparkWager));
  }, [createEmptyBoard, stopAllTimers, sparkWager]);

  const getCellClasses = (r: number, c: number): string => {
    const piece = droppingPiece && droppingPiece.col === c && droppingPiece.tempRow === r ? droppingPiece.player : board[r][c];
    let classes = 'w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full transition-all duration-150 flex items-center justify-center ';
    if (piece === PLAYER1) classes += `${PLAYER1_COLOR_BG_GALACTIC} ${PLAYER1_COLOR_BORDER_GALACTIC} border-2 ${PLAYER1_GLOW_GALACTIC}`;
    else if (piece === PLAYER2) classes += `${PLAYER2_COLOR_BG_GALACTIC} ${PLAYER2_COLOR_BORDER_GALACTIC} border-2 ${PLAYER2_GLOW_GALACTIC}`;
    else classes += 'bg-black/40 border-2 border-purple-900/40 hover:bg-gray-800/40 ';
    
    if (winningLine && winningLine.some(coord => coord.r === r && coord.c === c)) classes += ' ring-4 ring-yellow-400 animate-pulse';
    return classes;
  };

  const timerColor = currentTurnTime <= 5 ? 'text-red-500' : currentTurnTime <= 10 ? 'text-orange-500' : 'text-white';
  const timerScale = currentTurnTime <= 5 ? 'scale-110' : 'scale-100';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#010412] text-white p-4 relative overflow-hidden font-orbitron">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#A100FF_0%,_transparent_70%)]"></div>
        <div className="grid grid-cols-7 h-full w-full border-x border-purple-500/20">
            {Array(7).fill(0).map((_, i) => <div key={i} className="border-r border-purple-500/10"></div>)}
        </div>
      </div>

      {/* Top Bar */}
      <div className="w-full max-w-5xl flex justify-between items-start z-10 mb-4 px-4">
        <div className={`p-4 rounded-2xl border-2 transition-all duration-300 w-48 ${currentPlayer === PLAYER1 && !gameOver ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-gray-800 bg-black/40 opacity-70'}`}>
          <h3 className="text-orange-400 font-black text-lg mb-1">PLAYER 1</h3>
          <p className="text-2xl font-mono">{formatTime(player1TotalTime)}</p>
          <div className="flex gap-2 mt-2 opacity-80">
            <span className="flex items-center text-xs text-yellow-500"><SparkIcon className="w-3 h-3 mr-1" />{player1Sparks}</span>
            <span className="flex items-center text-xs text-purple-400"><NeuronIcon className="w-3 h-3 mr-1" />{player1Neurons}</span>
          </div>
        </div>

        <div className="text-center pt-2">
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-[#00E0FF]" style={{textShadow: '0 0 20px rgba(0,224,255,0.5)'}}>GRAVITY FOUR</h1>
            <p className="text-xs text-purple-400 mt-1 uppercase tracking-widest font-bold">Cortex Strike Protocol</p>
        </div>

        <div className={`p-4 rounded-2xl border-2 transition-all duration-300 w-48 text-right ${currentPlayer === PLAYER2 && !gameOver ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'border-gray-800 bg-black/40 opacity-70'}`}>
          <h3 className="text-cyan-400 font-black text-lg mb-1">PLAYER 2</h3>
          <p className="text-2xl font-mono">{formatTime(player2TotalTime)}</p>
          <div className="flex gap-2 mt-2 justify-end opacity-80">
            <span className="flex items-center text-xs text-purple-400"><NeuronIcon className="w-3 h-3 mr-1" />{player2Neurons}</span>
            <span className="flex items-center text-xs text-yellow-500">{player2Sparks}<SparkIcon className="w-3 h-3 ml-1" /></span>
          </div>
        </div>
      </div>

      {/* Arena Grid Section */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        {/* Drop Buttons Top */}
        <div className="grid grid-cols-7 gap-2 px-3">
          {Array(COLS).fill(0).map((_, c) => (
            <button key={`t-${c}`} onClick={() => handleDrop(c, 'top')} disabled={gameOver || !!droppingPiece} 
              className={`w-9 h-8 sm:w-11 sm:h-10 md:w-12 md:h-12 bg-gray-900/80 border-2 border-purple-500/30 rounded-t-lg hover:border-cyan-400 hover:text-cyan-400 text-purple-400 transition-all font-black ${currentPlayer === PLAYER1 ? 'hover:border-orange-500 hover:text-orange-500' : ''}`}>
              ↓
            </button>
          ))}
        </div>

        {/* Board */}
        <div className="relative p-3 bg-black/60 rounded-xl border-4 border-purple-900/50 shadow-[0_0_50px_rgba(161,0,255,0.2)]">
          <div className="grid grid-cols-7 gap-2">
            {board.map((row, r) => row.map((_, c) => (
              <div key={`${r}-${c}`} className={getCellClasses(r, c)}>
                {r === GRAVITY_LINE_ROW && (
                  <div className="absolute inset-x-0 h-1 bg-cyan-400/30 blur-[2px] z-0 animate-pulse"></div>
                )}
                {r === GRAVITY_LINE_ROW && (
                  <div className="absolute inset-x-0 h-[1px] bg-cyan-400 shadow-[0_0_10px_#00E0FF] z-0"></div>
                )}
              </div>
            )))}
          </div>
        </div>

        {/* Drop Buttons Bottom */}
        <div className="grid grid-cols-7 gap-2 px-3">
          {Array(COLS).fill(0).map((_, c) => (
            <button key={`b-${c}`} onClick={() => handleDrop(c, 'bottom')} disabled={gameOver || !!droppingPiece} 
              className={`w-9 h-8 sm:w-11 sm:h-10 md:w-12 md:h-12 bg-gray-900/80 border-2 border-purple-500/30 rounded-b-lg hover:border-cyan-400 hover:text-cyan-400 text-purple-400 transition-all font-black ${currentPlayer === PLAYER1 ? 'hover:border-orange-500 hover:text-orange-500' : ''}`}>
              ↑
            </button>
          ))}
        </div>
      </div>

      {/* Timer Grenade - Bottom Center */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <div className={`
          relative w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-300
          ${currentTurnTime <= 5 ? 'border-red-600 bg-red-950/40 animate-pulse' : 'border-purple-600 bg-purple-950/20'}
          shadow-[0_0_30px_rgba(161,0,255,0.2)]
        `}>
          <div className={`text-4xl font-black italic transition-all duration-200 ${timerColor} ${timerScale}`}>
            {currentTurnTime}s
          </div>
          {/* Stress particles around the grenade */}
          {currentTurnTime <= 5 && (
              <div className="absolute inset-0 rounded-full border border-red-500 animate-ping opacity-25"></div>
          )}
        </div>
        <p className="mt-2 text-[10px] font-bold text-purple-400 tracking-widest uppercase">Grenade Timer Active</p>
      </div>

      <div className="fixed top-4 right-4 z-40">
        <MemoizedButton onClick={onExitGame} variant="danger" size="small" className="!bg-red-950/60 border border-red-500/50 hover:!bg-red-900">
          FORFEIT
        </MemoizedButton>
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-black border-4 border-[#00E0FF] p-10 rounded-3xl text-center shadow-[0_0_100px_rgba(0,224,255,0.4)] max-w-md w-full mx-4">
            <h2 className="text-5xl font-black italic mb-2 tracking-tighter" style={{ color: winner === PLAYER1 ? '#FF8C00' : winner === PLAYER2 ? '#00E0FF' : 'white' }}>
                {winner === 'draw' ? 'DRAW' : 'VICTORY'}
            </h2>
            <p className="text-xl text-purple-400 mb-8 font-bold uppercase">{winReason || (winner === PLAYER1 ? 'PLAYER 1 WINS' : 'PLAYER 2 WINS')}</p>
            <div className="grid gap-4">
              <MemoizedButton onClick={resetGame} variant="primary" size="large" className="w-full">REMATCH</MemoizedButton>
              <MemoizedButton onClick={onExitGame} variant="ghost" size="medium" className="w-full">EXIT ARENA</MemoizedButton>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
});

export default GravityFourGame;
