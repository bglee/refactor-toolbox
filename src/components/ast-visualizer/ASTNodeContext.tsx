import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { ASTNode } from "../../model/AstNode";
const defaultState = false;
export interface ASTNodeContextType {
  nodeState: Map<string, boolean>;
  setNodeState: (newState: Map<string, boolean>) => void;
}

const ASTNodeContext = React.createContext<ASTNodeContextType>({
  nodeState: new Map(),
  setNodeState: () => {},
});

export const useNodes = (nodeKey: string) => {
  const { nodeState, setNodeState } = React.useContext(ASTNodeContext);

  const setState = useCallback(
    (newState: boolean) =>
      setNodeState(new Map(nodeState).set(nodeKey, newState)),
    [nodeKey, nodeState, setNodeState],
  );

  const state = useMemo(
    () =>
      nodeState.get(nodeKey) === undefined
        ? defaultState
        : nodeState.get(nodeKey),
    [nodeKey, nodeState],
  );
  return { state, setState };
};

export const pathBuilder = (node: ASTNode, parentPath: string, index: number) =>
  `${parentPath}.${node.type || "Object"}[${index}]`;

export const useASTNodeState = (): ASTNodeContextType => {
  const [nodeState, setNodeState] = useState(new Map<string, boolean>());
  //const [defaultState, setDefaultState] = useState(true);
  return { nodeState, setNodeState }; //defaultState, setDefaultState };
};

interface ASTNodeProviderProps extends PropsWithChildren {
  state: ASTNodeContextType;
}

export const ASTNodeProvider: React.FC<ASTNodeProviderProps> = ({
  children,
  state,
}) => {
  return (
    <ASTNodeContext.Provider value={state}>{children}</ASTNodeContext.Provider>
  );
};
