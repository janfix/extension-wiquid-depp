define([
        'CircuitPCI/interaction/runtime/js/core/componentDoubleEnded',
        'CircuitPCI/interaction/runtime/js/core/math',
    ],
    function(ComponentDoubleEnded, MathUtils) {
        'use strict';

        function componentCapacitor(pos) {

            var obj1 = {
                capacitance: 1e-6,
                useTrapezoidalIntegration: true,
                companionModelResistance: 0,
                companionModelCurrent: 0,
                getSaveId: function getSaveId() {
                    return "D"
                },
                getName: function getName() {
                    return "DiodeElectro"
                },


                saveToString: function saveToString(manager) {
                    return this.joints[0] + "," + this.joints[1] + "," + MathUtils.valueToStringWithUnitPrefix(this.capacitance) + ","
                },


                loadFromString: function loadFromString(manager, loadData, reader) {
                    //super.loadFromString(manager, loadData, reader)
                    this.capacitance = reader.readNumber()
                },


                solverBegin: function solverBegin(manager, solver) {
                    this.current = 0
                    this.currentAnim = 0
                    this.companionModelCurrent = 0

                    if (this.useTrapezoidalIntegration) {
                        this.companionModelResistance = manager.timePerIteration / (2 * this.capacitance)
                        solver.stampResistance(this.nodes[0], this.nodes[1], this.companionModelResistance)
                            //console.log("comp resistance (trapezoidal)", manager.timePerIteration, this.capacitance)
                            //console.log("comp resistance (trapezoidal)", this.companionModelResistance)
                    } else {
                        this.companionModelResistance = manager.timePerIteration / this.capacitance
                        solver.stampResistance(this.nodes[0], this.nodes[1], this.companionModelResistance)
                            //console.log("comp resistance (back euler)", this.companionModelResistance)
                    }
                },


                solverIterationBegin: function solverIterationBegin(manager, solver) {
                    const voltage = manager.getNodeVoltage(this.nodes[0]) - manager.getNodeVoltage(this.nodes[1])

                    if (this.useTrapezoidalIntegration) {
                        this.companionModelCurrent = -voltage / this.companionModelResistance - this.current
                        solver.stampCurrentSource(this.nodes[0], this.nodes[1], this.companionModelCurrent)
                            //console.log("voltage, comp current (trapezoidal)", voltage, this.companionModelCurrent)
                    } else {
                        this.companionModelCurrent = -voltage / this.companionModelResistance
                        solver.stampCurrentSource(this.nodes[0], this.nodes[1], this.companionModelCurrent)
                            //console.log("voltage, comp current (back euler)", voltage, this.companionModelCurrent)
                    }
                },


                solverIterationEnd: function solverIterationEnd(manager, solver) {
                    const voltage = manager.getNodeVoltage(this.nodes[0]) - manager.getNodeVoltage(this.nodes[1])

                    this.current = voltage / this.companionModelResistance + this.companionModelCurrent
                },


                getEditBox: function getEditBox(editBoxDef) {
                    editBoxDef.addNumberInput("Capacitance", "F", this.capacitance, (x) => { this.capacitance = x })
                },

                render: function render(manager, ctx) {
                    const symbolSize = Math.min(75, this.getLength()); //Controle du width
                    const plateSize = 25 // Controle du height


                    this.drawSymbolBegin(manager, ctx, symbolSize)


                    //Diode Electroluminescente
                    // Dessiner le conducteur
                    /* ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0])) */

                    // La diode Electroluminescente ***********************************
                    // Dessiner le conducteur
                    ctx.beginPath()
                    ctx.moveTo(-symbolSize / 2, 0)
                    ctx.lineTo(-symbolSize / 4, 0)
                    ctx.stroke()

                    // Dessiner le triangle (la diode)
                    ctx.beginPath()
                    ctx.moveTo(-symbolSize / 4, -plateSize / 2)
                    ctx.lineTo(-symbolSize / 4, plateSize / 2)
                    ctx.lineTo(symbolSize / 4, 0)
                    ctx.closePath()
                    ctx.stroke()

                    // Dessiner la cathode
                    ctx.beginPath()
                    ctx.moveTo(symbolSize / 4, -plateSize / 2)
                    ctx.lineTo(symbolSize / 4, plateSize / 2)
                    ctx.stroke()

                    // Dessiner le connecteur
                    ctx.beginPath()
                    ctx.moveTo(symbolSize / 2, 0)
                    ctx.lineTo(symbolSize / 4, 0)
                    ctx.stroke()

                    // Symboles ElectoLuminescents -Corps flèche 1
                    ctx.beginPath()
                    ctx.lineWidth = 1;
                    ctx.moveTo(-5, symbolSize / 4 - 25)
                    ctx.lineTo(10, -symbolSize / 5)
                    ctx.stroke()

                    // Symboles ElectoLuminescents -Corps flèche 2 Décal 30cm
                    ctx.beginPath()
                    ctx.lineWidth = 1;
                    ctx.moveTo(-10, symbolSize / 4 - 30)
                    ctx.lineTo(5, -symbolSize / 5 - 5)
                    ctx.stroke()

                    // Pointe flèche 2
                    ctx.beginPath();
                    ctx.moveTo(10, -symbolSize / 5);
                    ctx.lineTo(2, -symbolSize / 5 + 2);
                    ctx.lineTo(5, -symbolSize / 5 + 5);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = "#ff8800";
                    ctx.fill();

                    // Point flèche 1
                    ctx.beginPath();
                    ctx.moveTo(5, -symbolSize / 5 - 5);
                    ctx.lineTo(2 - 5, -symbolSize / 5 + 2 - 5);
                    ctx.lineTo(5 - 5, -symbolSize / 5);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = "#ff8800";
                    ctx.fill();




                    // diode/Polygone
                    /* ctx.beginPath();
                    ctx.moveTo(-symbolSize / 20, 10)
                    ctx.lineTo(-symbolSize / 20, 10)
                    ctx.lineTo(symbolSize / 20, 2)
                    ctx.closePath();
                    ctx.stroke();
                    */





                    // Resistance rectangulaire********************************
                    /* const radius = 5; // rayon pour arrondir les coins
                    ctx.roundRect(-symbolSize / 2, -plateSize / 2, symbolSize, plateSize, radius);
                    ctx.stroke(); */


                    //Dessing du capacitor*******************************
                    /*  ctx.beginPath()
                     ctx.moveTo(-symbolSize / 2, -plateSize)
                     ctx.lineTo(-symbolSize / 2, plateSize)
                     ctx.stroke() */

                    /*  ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1])) */
                    /* ctx.beginPath()
                     ctx.moveTo(symbolSize / 2, -plateSize)
                     ctx.lineTo(symbolSize / 2, plateSize)
                     ctx.stroke() */

                    this.drawSymbolEnd(manager, ctx)
                        //this.drawRatingText(manager, ctx, this.capacitance, "F")
                }

            };
            var obj2 = Object.create(ComponentDoubleEnded.add(pos));
            var ComponentCapacitor = Object.assign(obj2, obj1);

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


            return ComponentCapacitor;


        }



        return {
            add: function(pos) {
                return componentCapacitor(pos)
            }
        };
    });