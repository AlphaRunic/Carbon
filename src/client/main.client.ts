import { UI  } from "shared/Carbon/Framework";
import { LoadBar } from "shared/Carbon/Utility/UI/All";

const loadScreen = UI.Find("LoadScreen");
const bg = UI.FindElement<ImageLabel>(loadScreen, "Background");
const barFrame = UI.FindElement<Frame>(bg, "Bar");
const bar = new LoadBar(barFrame);

bar.Finished.Connect(() => loadScreen.Destroy());

UI.Enable();
for (let i = 0; i < 100; i++)
    bar.AddProgress();