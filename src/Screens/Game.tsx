// src/Game.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Appearance } from 'react-native';
import Board from '../Component/Board';
import { SvgXml } from 'react-native-svg';
const Game = () => {

  const IconSvgXml = {
Reset:`<svg width="800px" height="800px" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
    <g fill="#1565C0">
        <path d="M13,13c0-3.3,2.7-6,6-6h10c3.3,0,6,2.7,6,6h4c0-5.5-4.5-10-10-10H19C13.5,3,9,7.5,9,13v11.2h4V13z"/>
        <polygon points="4.6,22 11,30.4 17.4,22"/>
    </g>
    <g fill="#000">
        <path d="M35,35c0,3.3-2.7,6-6,6H19c-3.3,0-6-2.7-6-6H9c0,5.5,4.5,10,10,10h10c5.5,0,10-4.5,10-10V23h-4V35z"/>
        <polygon points="30.6,26 37,17.6 43.4,26"/>
    </g>
</svg>`,
  };


  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const handlePress = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] !== '' || winner) return;

    const newBoard = board.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? currentPlayer : cell))
    );

    setBoard(newBoard);
    checkWinner(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
        setWinner(board[a[0]][a[1]]);
        return;
      }
    }

    if (board.every(row => row.every(cell => cell))) {
      setWinner('Draw');
    }
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Board board={board} onPress={handlePress} />
      {winner && <Text style={styles.winnerText}>{winner === 'Draw' ? "It's a draw!" : `Winner: ${winner}`}</Text>}
      {/* <Button title="Reset Game" onPress={resetGame} /> */}
      <TouchableOpacity style={styles.reset} onPress={resetGame}><SvgXml xml={IconSvgXml.Reset} width={70} height={50} fill={isDarkMode ?  '#fff' :'#000' } /></TouchableOpacity>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 24,
    marginTop: 20,
  },
  reset:{
   margin:30,
  },
});

export default Game;
