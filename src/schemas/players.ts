export type Player = {
  createTime: string;
  description: string;
  id: number;
  name: string;
  playerSportRating: {
    createTime: string;
    format: string;
    id: number;
    provisional: boolean;
    rateScore: number;
    sportId: number;
    updateTime: string;
  }[];
  updateTime: string;
  userId: number;
};
