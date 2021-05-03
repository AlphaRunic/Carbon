import { Players, ReplicatedStorage, Workspace, RunService as Runtime } from "@rbxts/services";
import { BaseComponent } from "./Component";
import { Disposable } from "./Classes/Utility/Disposable";
import { UI } from "./Classes/Client/UI";

const Camera = Workspace.CurrentCamera as Camera;
const Assets = ReplicatedStorage.WaitForChild("Assets") as Folder;
const Player: Player = Players.LocalPlayer;
let Character: Model;
let PUI: PlayerGui;

if (Player) {
    Character = Player.Character ?? Player.CharacterAdded.Wait()[0];
    PUI = Player.WaitForChild("PlayerGui") as PlayerGui;
}

export type NullishInstance = 
    | Instance
    | undefined;

export type NullishModel = 
    | Model 
    | undefined;
    
export type NullishBoolean =
    | boolean
    | undefined;

export type NullishFunction = 
    | Callback
    | undefined;
 
export class Carbon {
    public static Render: RBXScriptSignal = Runtime.RenderStepped;
    public static Stepped: RBXScriptSignal = Runtime.Stepped;
    public static Update: RBXScriptSignal = Runtime.Heartbeat;

    public static RunComponents(componentList: BaseComponent[]) {
        const isClient = Runtime.IsClient()
        componentList.forEach((component: BaseComponent) => {
            if (component.Start)
                component.Start(component);

            let step: RBXScriptConnection;
            let upd: RBXScriptConnection;

            if (isClient) {
                Runtime.BindToRenderStep(
                    component.Name, 
                    Enum.RenderPriority.Camera.Value, 
                    (dt: number): void => {
                        /*  Compiler fails here. 
                            component.Update(dt) should compile to component:Update(dt). 
                            Instead, it compiles to component.Update(dt), therefore I use component.Update(component, dt)  */
                        if (component.Update)
                            component.Update(component, dt);
                    }
                );

                step = this.Stepped.Connect((time: number, dt: number): void => {
                    if (component.Run)
                        component.Run(component, time, dt);
                });

                if (!component.Update)
                    Runtime.UnbindFromRenderStep(component.Name);
                if (!component.Run)
                    step.Disconnect();
            } else {
                upd = this.Update.Connect((dt: number): void => {
                    if (component.Update)
                        component.Update(component, dt);
                });

                if (!component.Update)
                    upd.Disconnect();
            }
        });
    }
}

export { Disposable, UI };
export { Assets, Player, Character, Camera };