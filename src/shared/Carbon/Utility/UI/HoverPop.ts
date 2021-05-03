import { GetScaledUDim } from "./GetScaledUDim";
import { Tween } from "./Tween";

export function HoverPop(button: GuiButton, pop: number, spd: number) {
    const _default = {
        Size: button.Size,
        Position: button.Position
    }

    const info = new TweenInfo(spd, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);

    button.MouseEnter.Connect(() => {
        const popUDim = new UDim2(0, pop, 0, pop);
        const scaled: UDim2 = GetScaledUDim(button, popUDim);
        const popScale = new UDim2(
            scaled.X.Scale / 2, 0,
            scaled.Y.Scale / 2, 0
        );
        
        Tween(button, info, {
            Size: _default.Size.add(popUDim),
			Position: _default.Position.sub(popScale)
        });
    });

    button.MouseLeave.Connect(() => {
        Tween(button, info, _default);
    });
}