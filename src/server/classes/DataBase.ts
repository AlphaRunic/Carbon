import DataStore2 from "@rbxts/datastore2"
import { Carbon as Framework } from "shared/Carbon";

const Carbon = new Framework(script);

export type Store = DataStore2<unknown>;

export class DataBase {
    public constructor(private plr: Player, ...dataTypes: string[]) {
        DataStore2.Combine("DATA", ...dataTypes);
    }

    private GetStore(name: string): Store {
        return DataStore2(name, this.plr);
    }

    public InitStore(name: string, defaultValue?: unknown): Store {
        const store = this.GetStore(name);

        if (defaultValue !== undefined) {
            store.Get(defaultValue);
            store.Set(defaultValue);
        }

        store.Save();
        store.Update(oldValue => {
            if (!typeIs(oldValue, "number")) {
                return 1;
            }
            return oldValue + 1;
        });

        function updateClient(value: unknown): void {
            Carbon.Network.Emit(`Update ${name}`, value);
        }

        store.OnUpdate(updateClient);

        return store;
    }

    public Get(name: string, defaultValue?: any): Promise<unknown> {
        const store = this.GetStore(name);
        return store.GetAsync();
    }

    public Set(name: string, value: any): Promise<unknown> {
        const store = this.GetStore(name);
        return new Promise(() => {
            store.Set(value)
            return value;
        });
    }
}