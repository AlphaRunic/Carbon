import { Pair } from "../../Classes/Utility/Pair";
import { GetScaledUDim } from "./GetScaledUDim";
import { Tween } from "./Tween";

export function ClickPop(button: GuiButton, pop: number, spd: number) {
    const _default = {
        Size: button.Size,
        Position: button.Position
    }

    const info = new TweenInfo(spd / 2, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);

    function getPop(): Pair<UDim2> {
        const popUDim = new UDim2(0, -pop, 0, -pop);
        const scaleUDim = GetScaledUDim(button, popUDim);
        const popScale = new UDim2(scaleUDim.X.Scale / 2, 0, scaleUDim.Y.Scale / 2, 0);
        return new Pair<UDim2>(popUDim, popScale);
    }

    button.MouseButton1Down.Connect(() => {
        const scalePair: Pair<UDim2> = getPop();
        const popUDim = scalePair.First;
        const popScale = scalePair.Second;

        Tween(button, info, {
            Size: _default.Size.add(popUDim),
            Position: _default.Position.sub(popScale)
        });
    });

    button.MouseButton1Up.Connect(() => {
        const scalePair: Pair<UDim2> = getPop();
        const popUDim = scalePair.First;
        const popScale = scalePair.Second;

        Tween(button, info, {
            Size: _default.Size.sub(popUDim),
            Position: _default.Position.add(popScale)
        });
    })
}