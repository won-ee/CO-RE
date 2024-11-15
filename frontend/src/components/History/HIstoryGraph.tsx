import React, { useRef } from "react";
import {
  Gitgraph,
  Branch,
  Orientation,
  TemplateName,
  templateExtend,
} from "@gitgraph/react";
import { GitGraphContainer } from "./HistoryGraph.styled";
import { GitGraphComponentProps, CommitType } from "../../Types/historyType";

const GitGraphComponent: React.FC<GitGraphComponentProps> = ({ graphData }) => {
  const isInitialized = useRef(false);

  const withoutAuthor = templateExtend(TemplateName.Metro, {
    commit: {
      message: {
        displayAuthor: false,
        displayHash: false,
        font: "20px bold",
      },
      dot: {
        size: 17,
        strokeColor: "white",
        strokeWidth: 3,
      },
      spacing: 85,
    },
    colors: [
      "rgba(9, 91, 207, 0.8)",
      "rgba(217, 1, 113, 0.8)",
      "rgba(201, 169, 48, 0.8)",
      "rgba(111, 193, 53, 0.8)",
      "rgba(46, 206, 157, 0.8)",
      "rgba(29, 28, 26, 0.8)",
    ],
  });

  return (
    <>
      <GitGraphContainer>
        <Gitgraph
          options={{
            orientation: Orientation.VerticalReverse,
            template: withoutAuthor,
          }}
        >
          {(gitgraph) => {
            if (!isInitialized.current && graphData) {
              isInitialized.current = true;

              const master = gitgraph.branch("master");
              master.commit("Initial commit");

              const develop = master.branch("develop");
              develop.commit("Start develop branch");

              const branchMap: Record<string, Branch> = { master, develop };
              const commitMap: Record<string, Branch> = {};

              const allCommits = graphData
                .flatMap((pr) =>
                  pr.commits.map((commit: CommitType) => ({
                    ...commit,
                    prHead: pr.head,
                    prId: pr.prId,
                  })),
                )
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
                );

              allCommits.forEach((commit) => {
                const branchName = `feature-${commit.prId}`;
                let headBranch = branchMap[commit.prHead];

                if (!headBranch) {
                  headBranch = develop.branch(branchName);
                  branchMap[commit.prHead] = headBranch;
                }

                if (commit.secondParent) {
                  const mergeBranch = commitMap[commit.secondParent];
                  if (mergeBranch) {
                    headBranch.merge(
                      mergeBranch,
                      `Merge and commit: ${commit.message}`,
                    );
                  }
                } else {
                  headBranch.commit({
                    subject: commit.message,
                    hash: commit.sha,
                  });
                }

                commitMap[commit.sha] = headBranch;
              });

              master.merge(develop, "develop branch merge complete");
            }
          }}
        </Gitgraph>
      </GitGraphContainer>
    </>
  );
};

export default GitGraphComponent;
