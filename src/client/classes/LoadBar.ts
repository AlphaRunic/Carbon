import { Tweenable } from "./Tweenable";

export class LoadBar extends Tweenable {
    private progressSpeed: number;
    private top: Frame;
    private info: TweenInfo;
    private defaultSize: UDim2;

    public Finished: BindableEvent;

    constructor(bar: Frame, progressSpeed: number = .2) {
        const top = bar.WaitForChild("Top") as Frame;
        super(top);

        this.progressSpeed = progressSpeed;
        this.top = top;
        this.info = new TweenInfo(this.progressSpeed);

        this.defaultSize = this.top.Size;

        this.Finished = new Instance("BindableEvent");

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