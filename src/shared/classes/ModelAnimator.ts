export class ModelAnimator {
    private tracks = new Map<string, AnimationTrack>();
    private controller: Animator;
    private animFolder: Folder;

    constructor(
        public Model: Model,
    ) {
        const animController = Model.FindFirstChild("AnimationController") as AnimationController;
        this.controller = animController.WaitForChild("Animator") as Animator;
        this.animFolder = Model.FindFirstChild("Animations") as Folder;
    }

    private GetAnimation(animName: string): Animation {
        return this.animFolder.WaitForChild(animName) as Animation
    }

    public Animate(animName: string): AnimationTrack {
        this.StopAllAnimations();

        const anim: Animation = this.GetAnimation(animName);
        const track: AnimationTrack = this.controller.LoadAnimation(anim);
        this.tracks.set(animName, track);

        track.Stopped.Connect(() => this.tracks.delete(animName));
        track.Play();
        
        return track;
    }

    public StopAnimation(animName: string): void {
        const track = this.tracks.get(animName);
        track?.Stop();
    }

    public StopAllAnimations(): void {
        this.tracks.forEach((track: AnimationTrack, animName: string) => this.StopAnimation(animName));
    }
}