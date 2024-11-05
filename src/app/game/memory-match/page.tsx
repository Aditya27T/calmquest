'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from 'next/link';
import { ChevronLeft, Timer, Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

// Symbols for cards using emojis
const CARD_SYMBOLS = ['🌸', '🌺', '🌻', '🌹', '🌷', '🍀', '🌿', '🌱'];

interface CardType {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);

  // Initialize game
  useEffect(() => {
    initializeGame();
    const savedBestScore = localStorage.getItem('memoryMatchBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameCompleted]);

  const initializeGame = () => {
    const symbols = [...CARD_SYMBOLS, ...CARD_SYMBOLS];
    const shuffledCards = symbols
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setGameStarted(false);
    setGameCompleted(false);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (
      flippedCards.length === 2 || 
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    const newCards = cards.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCardId, secondCardId] = newFlippedCards;
      
      if (cards[firstCardId].symbol === cards[secondCardId].symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
          
          // Check if game is completed
          const allMatched = newCards.every(
            card => card.id === firstCardId || card.id === secondCardId || card.isMatched
          );
          
          if (allMatched) {
            setGameCompleted(true);
            const currentScore = moves + 1;
            if (!bestScore || currentScore < bestScore) {
              setBestScore(currentScore);
              localStorage.setItem('memoryMatchBestScore', currentScore.toString());
            }
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => 
            prev.map(card => 
              newFlippedCards.includes(card.id)
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        <Link 
          href="/game" 
          className="inline-flex items-center text-purple-700 hover:text-purple-800 mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Game
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-purple-900 text-center mb-8">
            Memory Match
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Langkah</p>
              <p className="text-2xl font-semibold text-purple-900">{moves}</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Waktu</p>
              <p className="text-2xl font-semibold text-purple-900">{formatTime(time)}</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Rekor Terbaik</p>
              <p className="text-2xl font-semibold text-purple-900">
                {bestScore ? `${bestScore} langkah` : '-'}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <Button 
                onClick={initializeGame}
                className="w-full h-full flex items-center justify-center gap-2"
                variant="outline"
              >
                <RefreshCw className="h-4 w-4" />
                Mulai Ulang
              </Button>
            </Card>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-lg text-4xl flex items-center justify-center
                  transition-all duration-300 cursor-pointer
                  ${card.isFlipped || card.isMatched
                    ? 'bg-purple-100 rotate-0'
                    : 'bg-purple-600 rotate-y-180'
                  }
                  ${card.isMatched ? 'opacity-50' : ''}
                  hover:scale-105`}
                disabled={card.isMatched}
              >
                {(card.isFlipped || card.isMatched) && card.symbol}
              </button>
            ))}
          </div>

          {gameCompleted && (
            <Card className="p-6 text-center bg-green-50 border-green-200">
              <Trophy className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Selamat! Anda Berhasil!
              </h3>
              <p className="text-green-600 mb-4">
                Anda menyelesaikan permainan dalam {moves} langkah dan {formatTime(time)}
              </p>
              <Button
                onClick={initializeGame}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Main Lagi
              </Button>
            </Card>
          )}

          <Card className="p-6 bg-purple-50">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">
              Petunjuk Permainan
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>1. Klik kartu untuk membalikannya</li>
              <li>2. Temukan pasangan simbol yang sama</li>
              <li>3. Selesaikan dengan langkah seminimal mungkin</li>
              <li>4. Latih memori Anda secara rutin untuk hasil optimal</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}