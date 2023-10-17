define([
        'CircuitPCI/interaction/runtime/js/core/componentDoubleEnded',
        'CircuitPCI/interaction/runtime/js/core/math',
    ],
    function(ComponentDoubleEnded, MathUtils) {
        'use strict';

        function componentResistor(pos) {

            var obj1 = {
                resistance: 1000,
                getSaveId: function getSaveId() {
                    return "RA"
                },
                getName: function getName() {
                    return "Aluminium"
                },
                saveToString: function saveToString(manager) {
                    return this.joints[0] + "," + this.joints[1] + "," + MathUtils.valueToStringWithUnitPrefix(this.resistance) + ","
                },
                loadFromString: function loadFromString(manager, loadData, reader) {
                    //super.loadFromString(manager, loadData, reader)
                    this.resistance = reader.readNumber()
                },
                solverBegin: function solverBegin(manager, solver) {
                    solver.stampResistance(this.nodes[0], this.nodes[1], this.resistance)
                },
                solverIterationEnd: function solverIterationEnd(manager, solver) {
                    const v0 = manager.getNodeVoltage(this.nodes[0])
                    const v1 = manager.getNodeVoltage(this.nodes[1])
                    this.current = (v0 - v1) / this.resistance
                },
                getEditBox: function getEditBox(editBoxDef) {
                    editBoxDef.addNumberInput("Resistance", "Ω", this.resistance, (x) => { this.resistance = x })
                },
                render: function render(manager, ctx) {
                    const symbolSize = Math.min(75, this.getLength()); //Controle du width
                    const plateSize = 30 // Controle du height

                    this.drawSymbolBegin(manager, ctx, symbolSize)
                        /* this.drawSymbolSetGradient(manager, ctx, symbolSize,
                            manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0])),
                            manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1]))) */

                    // Resistance rectangulaire********************************
                    const radius = 2; // rayon pour arrondir les coins
                    ctx.roundRect(-symbolSize / 2, -plateSize / 2, symbolSize, plateSize, radius);
                    ctx.stroke();

                    ctx.font = "bolder  10px Arial";
                    ctx.fillStyle = '#FF8800';
                    const textWidth = ctx.measureText("M").width;
                    // Ajustement des coordonnées x et y pour centrer le texte
                    const textX = -symbolSize / 8 + 9;
                    const textY = -symbolSize / 8 + 9; // Vous pouvez ajuster cette valeur selon vos besoins

                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("ALUMINIUM", textX, textY);

                    console.log("ALU")
                    this.drawSymbolEnd(manager, ctx)
                        // this.drawRatingText(manager, ctx, this.resistance, "Ω", 25)
                }


            }
            var obj2 = Object.create(ComponentDoubleEnded.add(pos));
            var ComponentResistor = Object.assign(obj2, obj1);

            CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
                if (w < 2 * r) r = w / 2;
                if (h < 2 * r) r = h / 2;
                this.beginPath();
                this.moveTo(x + r, y);
                this.arcTo(x + w, y, x + w, y + h, r);
                this.arcTo(x + w, y + h, x, y + h, r);
                this.arcTo(x, y + h, x, y, r);
                this.arcTo(x, y, x + w, y, r);
                this.closePath();
                return this;
            }


            return ComponentResistor;

        }



        return {
            add: function(pos) {
                return componentResistor(pos)
            }
        };
    });