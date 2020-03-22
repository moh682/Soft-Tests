export interface IMapper<T> {
	getAll?(): Promise<T[]>;
	getById?(id: number): Promise<T>;
	getByName?(name: string): Promise<T>;

	insert(value: T): Promise<void>;
	insertMany?(values: T[]): Promise<void>;

	deleteByName?(name: string): Promise<void>;
	deleteById?(id: number): Promise<void>;
	deleteAll?(): Promise<void>;
}
