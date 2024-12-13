import styled from "styled-components";
import React, {useState} from "react";
import "./TableTheme.tsx";
import {PlayerBlock} from "./player/PlayerBlock";
import {LeaderboardBlock} from "./leaderboard/LeaderboardBlock";
import {BingoLeaderboard} from "../../service/dataModels/bingoLeaderboardModels";
import {getBingoPlayers} from "../../service/bingoLeaderboardApi";
import {useQuery} from "@tanstack/react-query";

interface Props {
  leaderboardData?: BingoLeaderboard;
}

export const LeaderboardPage: React.FC<Props> = ({leaderboardData}) => {
  const [selectedPlayerName, setSelectedPlayerName] = useState<string | undefined>(undefined);

  const {data: playerData} = useQuery({
    queryKey: ["getBingoPlayers"],
    queryFn: () => getBingoPlayers(),
  });

  const playerTableData =
    playerData && playerData.length > 0 && selectedPlayerName !== undefined
      ? playerData.find((player) => player.name === selectedPlayerName)
      : undefined;

  if (leaderboardData === undefined) {
    return <EmptyDiv id="empty" />;
  }

  if (leaderboardData.entries.length === 0) {
    return (
      <NoDataDiv id="no-data">
        <p>Currently no data available.</p>
      </NoDataDiv>
    );
  }

  return (
    <LeaderboardPageDiv id="leaderboard-page">
      <LeaderboardBlock
        data={leaderboardData.entries}
        onRowClick={(row) => setSelectedPlayerName(row.playerName)}
      />
      <PlayerBlock data={playerTableData} />
    </LeaderboardPageDiv>
  );
};

const LeaderboardPageDiv = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
`;

const NoDataDiv = styled.div`
  display: flex;
  margin-top: 100px;
  height: 100%;
`;

const EmptyDiv = styled.div`
  display: flex;
  height: 100%;
`;
