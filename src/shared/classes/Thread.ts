export class Thread {
	public static Spawn(fn: Callback, ...args: any[]): any {
		return coroutine.wrap(fn)(args);
	}

	public static FastSpawn(fn: Callback, ...args: any[]): void {
		const event: BindableEvent = new Instance("BindableEvent");
		const conn: RBXScriptConnection = event.Event.Connect(fn);
		event.Fire(args);
		conn.Disconnect();
	}
}