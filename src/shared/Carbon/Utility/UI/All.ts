import ObjectEvent from "@rbxts/object-event";
import { Tweenable } from "../../Classes/Client/Tweenable";
import { Tween } from "./Tween";
import { ClickPop } from "./ClickPop";
import { HoverPop } from "./HoverPop";
import { GetScaledUDim } from "./GetScaledUDim";
import { UI } from "shared/Carbon/Classes/Client/UI";

export class LoadBar extends Tweenable {
    private progressSpeed: number;
    private top: Frame;
    private info: TweenInfo;
    private defaultSize: UDim2;

    public Finished: ObjectEvent<any>;

    constructor(bar: Frame, progressSpeed: number = .2) {
        const top = UI.FindElement<Frame>(bar, "Top");
        super(top);

        this.progressSpeed = progressSpeed;
        this.top = top;
        this.info = new TweenInfo(this.progressSpeed);

        this.defaultSize = this.top.Size;

        this.Finished = new ObjectEvent();

        this.SetProgress();
    }

    public SetProgress(progress: number = 0) {
        progress = math.clamp(progress, 5, 100)
        this.Tween(this.info, {
            Size: new UDim2(
                progress / 100, 
                this.defaultSize.X.Offset, 
                this.defaultSize.Y.Scale, 
                this.defaultSize.Y.Offset
            )
        }).Completed.Wait();

        if (progress === 100)
            this.Finished.Fire();
    }

    public AddProgress(progress: number = 1) {
        let prevProgress: number = this.top.Size.X.Scale * 100;
        this.SetProgress(prevProgress + progress);
    }
}

export { Tweenable, Tween, ClickPop, HoverPop, GetScaledUDim };