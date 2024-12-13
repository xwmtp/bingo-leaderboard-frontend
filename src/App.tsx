import styled from "styled-components";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Header} from "./components/Header";
import {AboutPage} from "./components/AboutPage";
import {Footer} from "./components/Footer";
import {LastUpdated} from "./components/UpdatedText";
import {LeaderboardPage} from "./components/leaderboardPage/LeaderboardPage";
import {getBingoLeaderboard} from "./service/bingoLeaderboardApi";
import {useQuery} from "@tanstack/react-query";

export function App() {
  const {data: leaderboardData} = useQuery({
    queryKey: ["getBingoLeaderboard"],
    queryFn: () => getBingoLeaderboard(),
  });

  const timestamp = leaderboardData === undefined ? undefined : leaderboardData.lastUpdated;

  return (
    <AppDiv id="app">
      <Router>
        <LastUpdated timestamp={timestamp} />
        <Header />
        <Routes>
          <Route path="/" element={<LeaderboardPage leaderboardData={leaderboardData} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </Router>
    </AppDiv>
  );
}

const AppDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
