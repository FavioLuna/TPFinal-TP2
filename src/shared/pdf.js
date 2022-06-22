"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pdf = void 0;
const html_pdf_1 = __importDefault(require("html-pdf"));
class Pdf {
    crear(html, archivo) {
        return new Promise((resolve, reject) => {
            html_pdf_1.default.create(html).toFile(archivo, function (err, res) {
                if (err) {
                    reject("Error al crear archivo pdf");
                }
                else {
                    resolve("Archivo creado");
                }
            });
        });
    }
}
exports.Pdf = Pdf;
