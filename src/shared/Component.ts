import { NullishFunction } from "./Carbon";

export abstract class BaseComponent {    
    public abstract Name: string;
    public abstract Start?: NullishFunction;
    public abstract Update?: NullishFunction;
    public abstract Run?: NullishFunction;
}