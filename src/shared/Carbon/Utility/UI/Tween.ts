import { TweenService } from "@rbxts/services";

export function Tween(i: Instance, ti: TweenInfo, goal: object): Tween {
    const tween: Tween = TweenService.Create(i, ti, goal);
    tween.Play();
    return tween;
}
