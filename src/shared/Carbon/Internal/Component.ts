import { Disposable } from "../Classes/Utility/Disposable";
import { Character, NullishFunction, Player } from "../Framework";

export abstract class Component {    
    public abstract readonly Name: string;
    public abstract Start?: NullishFunction;
    public abstract Update?: NullishFunction;
    public abstract Run?: NullishFunction;
}

export abstract class NetworkComponent extends Component {    
    abstract readonly Network: object;
}

export class DisposableComponent extends Disposable implements Component {
    public Player = Player
    public Character = Character;

    public constructor(
        public readonly Name: string
    ) {
        super();
    }
}