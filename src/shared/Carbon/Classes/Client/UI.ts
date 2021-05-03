import { Players } from "@rbxts/services";

const PUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

export class UI {
    private static Toggle(toggled: boolean) {
        PUI.GetChildren()
            .filter(e => e.IsA("ScreenGui"))
            .forEach(screenUI => {
                (screenUI as ScreenGui).Enabled = toggled;
            });
    }

    public static Enable() {
        UI.Toggle(true);
    }

    public static Disable() {
        UI.Toggle(false);
    }

    public static Find(instanceName: string): ScreenGui {
        return PUI.WaitForChild(instanceName) as ScreenGui;
    }

    public static FindElement<T extends Instance>(instance: Instance, instanceName: string): T {
        return instance.WaitForChild(instanceName) as T;
    }
}