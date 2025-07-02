export type Choice = 'rock' | 'paper' | 'scissors';

export type GameResult = 'win' | 'lose' | 'tie';

export interface GameState {
  playerChoice: Choice | null;
  cpuChoice: Choice | null;
  result: GameResult | null;
  playerScore: number;
  cpuScore: number;
  winStreak: number;
  bestStreak: number;
  isPlaying: boolean;
  showResult: boolean;
}

export interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}