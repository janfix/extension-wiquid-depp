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
                    return "IF"
                },
                getName: function getName() {
                    return "InterFerm"
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

                    var centerX = 0 + symbolSize / 2;
                    var centerY = 0;
                    var cradius = 10;


                    ctx.beginPath();
                    ctx.arc(centerX, centerY, cradius, 0, 2 * Math.PI);
                    ctx.arc(-symbolSize / 2, centerY, cradius, 0, 2 * Math.PI);
                    ctx.fillStyle = "#ff8800";
                    ctx.fill();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(centerX, centerY, cradius - 5, 0, 2 * Math.PI);
                    ctx.arc(-symbolSize / 2, centerY, cradius - 5, 0, 2 * Math.PI);
                    ctx.fillStyle = "black";
                    ctx.fill();




                    this.drawSymbolEnd(manager, ctx)
                        // this.drawRatingText(manager, ctx, this.resistance, "Ω", 25)

                }


            }
            var obj2 = Object.create(ComponentDoubleEnded.add(pos));
            var ComponentResistor = Object.assign(obj2, obj1);



            return ComponentResistor;

        }



        return {
            add: function(pos) {
                return componentResistor(pos)
            }
        };
    });