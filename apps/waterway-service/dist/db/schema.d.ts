export declare const Country: import("drizzle-orm/pg-core").PgEnum<["bj"]>;
export declare const SpeciesState: import("drizzle-orm/pg-core").PgEnum<["endangered", "safe", "disappearing"]>;
export declare const waterways: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "waterways";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        length: import("drizzle-orm/pg-core").PgColumn<{
            name: "length";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        cover: import("drizzle-orm/pg-core").PgColumn<{
            name: "cover";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        gallery: import("drizzle-orm/pg-core").PgColumn<{
            name: "gallery";
            tableName: "waterways";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: import("drizzle-orm").Column<{
                name: "gallery";
                tableName: "waterways";
                dataType: "string";
                columnType: "PgVarchar";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
            }, object, object>;
        }, {}, {}>;
        country: import("drizzle-orm/pg-core").PgColumn<{
            name: "country";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "bj";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: ["bj"];
            baseColumn: never;
        }, {}, {}>;
        locality: import("drizzle-orm/pg-core").PgColumn<{
            name: "locality";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        longitude: import("drizzle-orm/pg-core").PgColumn<{
            name: "longitude";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        latitude: import("drizzle-orm/pg-core").PgColumn<{
            name: "latitude";
            tableName: "waterways";
            dataType: "string";
            columnType: "PgNumeric";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "waterways";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updatedAt";
            tableName: "waterways";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const waterwayRelations: import("drizzle-orm").Relations<"waterways", {
    waterQuality: import("drizzle-orm").Many<any>;
    species: import("drizzle-orm").Many<"species">;
    contribution: import("drizzle-orm").Many<any>;
}>;
export declare const waterQuality: any;
export declare const waterQualityRelations: import("drizzle-orm").Relations<string, {
    waterway: import("drizzle-orm").One<"waterways", false>;
    contribution: import("drizzle-orm").One<any, false>;
}>;
export declare const species: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "species";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "species";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "species";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        scientificName: import("drizzle-orm/pg-core").PgColumn<{
            name: "scientific_name";
            tableName: "species";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        waterwayId: import("drizzle-orm/pg-core").PgColumn<{
            name: "waterway_id";
            tableName: "species";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        cover: import("drizzle-orm/pg-core").PgColumn<{
            name: "cover";
            tableName: "species";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "species";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        state: import("drizzle-orm/pg-core").PgColumn<{
            name: "state";
            tableName: "species";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "endangered" | "safe" | "disappearing";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: ["endangered", "safe", "disappearing"];
            baseColumn: never;
        }, {}, {}>;
        gallery: import("drizzle-orm/pg-core").PgColumn<{
            name: "gallery";
            tableName: "species";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: import("drizzle-orm").Column<{
                name: "gallery";
                tableName: "species";
                dataType: "string";
                columnType: "PgVarchar";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
            }, object, object>;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "species";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updatedAt";
            tableName: "species";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const speciesRelation: import("drizzle-orm").Relations<"species", {
    waterway: import("drizzle-orm").One<"waterways", true>;
}>;
export declare const contributions: any;
export declare const contributionRelations: import("drizzle-orm").Relations<string, {
    waterway: import("drizzle-orm").One<"waterways", false>;
    data: import("drizzle-orm").One<any, false>;
}>;
