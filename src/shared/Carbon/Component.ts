import { NullishFunction } from "./Framework";

export abstract class BaseComponent {    
    public abstract Name: string;
    public abstract Start?: NullishFunction;
    public abstract Update?: NullishFunction;
    public abstract Run?: NullishFunction;
}