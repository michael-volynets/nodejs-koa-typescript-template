import { Document, Schema, SchemaOptions, SchemaDefinition } from "mongoose";
import Lodash from "lodash";

export interface BaseDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
    isDocumentDeleted: boolean;
}

export class BaseSchema extends Schema {
    constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
        super(definition, Lodash.extend(options, { timestamps: true }));
        this.ConfigureSchema();
    }

    private ConfigureSchema() {
        this.add({
            createdAt: {
                type: Date,
                required: false
            },
            updatedAt: {
                type: Date,
                required: false
            },
            isDocumentDeleted: {
                type: Boolean,
                required: false
            }
        });

        this.pre("save", function (next) {
            const baseDocument = <BaseDocument>this;
            if (typeof baseDocument.isDocumentDeleted === "undefined") {
                baseDocument.isDocumentDeleted = false;
            }
            next();
        });
    }
}