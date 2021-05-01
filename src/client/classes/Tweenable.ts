import { TweenService } from "@rbxts/services";

function twn(i: Instance, ti: TweenInfo, goal: object): Tween {
    const tween: Tween = TweenService.Create(i, ti, goal);
    tween.Play();
    return tween;
}

export class Tweenable {
    public constructor(
        private instance: Instance
    ) {}

    public Tween(tweenInfo: TweenInfo, goal: object): Tween {
        return twn(this.instance, tweenInfo, goal);
    }
}