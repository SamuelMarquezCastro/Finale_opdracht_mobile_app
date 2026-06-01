import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SchoolGameScreen() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [books, setBooks] = useState([
    { id: 1, x: 20, y: 0 },
    { id: 2, x: 90, y: 50 },
    { id: 3, x: 160, y: 100 },
    { id: 4, x: 230, y: 150 },
  ]);

  useEffect(() => {
    if (!gameStarted) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const fallingBooks = setInterval(() => {
      setBooks((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          y: book.y > 600 ? 0 : book.y + 25,
        })),
      );
    }, 300);

    return () => clearInterval(fallingBooks);
  }, [gameStarted, gameOver]);

  const catchBook = (id) => {
    if (gameOver) return;

    setScore((prev) => prev + 1);
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? { ...book, y: 0, x: Math.floor(Math.random() * 300) }
          : book,
      ),
    );
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setGameStarted(false);
    setBooks([
      { id: 1, x: 20, y: 0 },
      { id: 2, x: 90, y: 50 },
      { id: 3, x: 160, y: 100 },
      { id: 4, x: 230, y: 150 },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vang de boeken</Text>

      {!gameStarted ? (
        <TouchableOpacity
          style={styles.restartButton}
          onPress={() => setGameStarted(true)}
        >
          <Text style={styles.restartText}>Start spel</Text>
        </TouchableOpacity>
      ) : !gameOver ? (
        <>
          <Text style={styles.info}>Score: {score}</Text>
          <Text style={styles.info}>Tijd: {timeLeft}s</Text>

          {books.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={[styles.book, { left: book.x, top: book.y + 120 }]}
              onPress={() => catchBook(book.id)}
            >
              <Text style={styles.bookText}>Boek</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <>
          <Text style={styles.gameOver}>Tijd voorbij!</Text>
          <Text style={styles.finalScore}>Eindscore: {score}</Text>

          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.restartText}>Opnieuw spelen</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f0",
  },

  title: {
    color: "#171717",
    textAlign: "center",
    marginTop: 40,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  info: {
    color: "#171717",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },

  book: {
    position: "absolute",
    backgroundColor: "#b7e34a",
    padding: 12,
    borderRadius: 8,
  },

  bookText: {
    color: "#111",
    fontWeight: "bold",
  },

  gameOver: {
    color: "#171717",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 100,
  },

  finalScore: {
    color: "#171717",
    textAlign: "center",
    fontSize: 22,
    marginTop: 15,
  },

  restartButton: {
    alignSelf: "center",
    marginTop: 25,
    backgroundColor: "#171717",
    padding: 15,
    minWidth: 180,
    borderRadius: 10,
  },

  restartText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
