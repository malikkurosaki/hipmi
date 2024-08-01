import { hookstate, useHookstate } from "@hookstate/core";

const gs_colab_create = hookstate<boolean>(false);
export function useGsCollabCreate(){
    const state = useHookstate(gs_colab_create);
    const value = state.get();
    return [value, state.set] as const
}
