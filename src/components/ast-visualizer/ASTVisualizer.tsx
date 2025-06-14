import { useFilteredASTNodes } from "../../store/second-order-data-hooks/useFilteredASTNodes";
import { useKeyVisibilityStore } from "../../store/store-hooks/useKeyVisibilityStore";
import { ASTTree } from "./ASTTree";

export const ASTVisualizer: React.FC = ({
}) => {
  const { keyVisibility } = useKeyVisibilityStore();
  const filteredASTNodes = useFilteredASTNodes();

  return (
    <>
      {Object.entries(filteredASTNodes).map(([key, node]) => (
        <ASTTree key={key} astNode={node} displayKeys={keyVisibility} />
      ))}
    </>
  );
};
