import { Gitgraph, Branch } from "@gitgraph/react";
import { useRef } from "react";
import { GitGraphContainer } from "./HistoryGraph.styled";
import graphData from "../../../public/HistoryData.json";

function GitGraphComponent() {
  const isInitialized = useRef(false);

  return (
    <GitGraphContainer>
      <Gitgraph
        options={{
          orientation: "vertical-reverse",
        }}
      >
        {(gitgraph) => {
          if (!isInitialized.current) {
            isInitialized.current = true;

            const master = gitgraph.branch("master");
            master.commit("Initial commit");

            const develop = master.branch("develop");
            develop.commit("Start develop branch");

            const branchMap: Record<string, Branch> = { master, develop };
            const commitMap: Record<string, Branch> = {};

            // 모든 커밋을 하나의 배열로 모아 시간 순서로 정렬
            const allCommits = graphData
              .flatMap((pr) =>
                pr.commits.map((commit) => ({
                  ...commit,
                  prHead: pr.head, // PR 헤드 이름 저장
                  prId: pr.prId, // PR ID 저장
                })),
              )
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              );

            // 시간 순서대로 모든 커밋을 처리
            allCommits.forEach((commit) => {
              const branchName = `feature-${commit.prId}`;
              let headBranch = branchMap[commit.prHead];

              // headBranch가 없으면 새로 생성
              if (!headBranch) {
                headBranch = develop.branch(branchName);
                branchMap[commit.prHead] = headBranch;
              }

              if (commit.secondParent) {
                // 병합 커밋일 경우
                const mergeBranch = commitMap[commit.secondParent];
                if (mergeBranch) {
                  // 병합 및 커밋 동시 처리
                  headBranch.merge(
                    mergeBranch,
                    `Merge and commit: ${commit.message}`,
                  );
                }
              } else {
                // 일반 커밋일 경우
                headBranch.commit({
                  subject: commit.message,
                  hash: commit.sha,
                });
              }

              // 현재 커밋을 commitMap에 저장
              commitMap[commit.sha] = headBranch;
            });

            // 최종적으로 develop을 master로 병합
            master.merge(develop, "develop 브랜치 병합 완료");
          }
        }}
      </Gitgraph>
    </GitGraphContainer>
  );
}

export default GitGraphComponent;
