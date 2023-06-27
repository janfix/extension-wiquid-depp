define([
        'CircuitPCI/interaction/runtime/js/core/componentDoubleEnded',
        'CircuitPCI/interaction/runtime/js/core/math',
    ],
    function(ComponentDoubleEnded, MathUtils) {
        'use strict';

        function componentBattery(p) {
            //P for Position object x, y 

            var obj1 = {
                voltage: 5,
                isVoltageSource: true,
                getSaveId: function getSaveId() {
                    return "v"
                },


                getName: function getName() {
                    return "Batterie"
                },


                saveToString: function saveToString(manager) {
                    return this.joints[0] + "," + this.joints[1] + "," + MathUtils.valueToStringWithUnitPrefix(this.voltage) + ","
                },


                loadFromString: function loadFromString(manager, loadData, reader) {
                    //super.loadFromString(manager, loadData, reader)
                    this.voltage = reader.readNumber()
                },


                solverBegin: function solverBegin(manager, solver) {
                    solver.stampVoltage(this.voltageSourceIndex, this.nodes[0], this.nodes[1], this.voltage)
                },


                solverIterationEnd: function solverIterationEnd(manager, solver) {
                    this.current = -manager.getVoltageSourceCurrent(this.voltageSourceIndex)
                },


                getEditBox: function getEditBox(editBoxDef) {
                    editBoxDef.addNumberInput("Voltage", "V", this.voltage, (x) => { this.voltage = x })
                },


                render: function render(manager, ctx) {
                    const symbolSize = Math.min(15, this.getLength())
                    const smallPlateSize = 12.5
                    const bigPlateSize = 25

                    this.drawSymbolBegin(manager, ctx, symbolSize)

                    ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0]))
                    ctx.strokeStyle = "#ff8800"
                    ctx.beginPath()
                    ctx.moveTo(-symbolSize / 2, -smallPlateSize)
                    ctx.lineTo(-symbolSize / 2, smallPlateSize)
                    ctx.stroke()

                    ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1]))
                    ctx.strokeStyle = "#ff8800"
                    ctx.beginPath()
                    ctx.moveTo(symbolSize / 2, -bigPlateSize)
                    ctx.lineTo(symbolSize / 2, bigPlateSize)
                    ctx.stroke()

                    this.drawSymbolEnd(manager, ctx)
                        //this.drawRatingText(manager, ctx, this.voltage, "V")
                }

            };
            var obj2 = Object.create(ComponentDoubleEnded.add(p));
            var ComponentBattery = Object.assign(obj2, obj1);

            return ComponentBattery;


        }



        return {
            add: function(p) {
                return componentBattery(p)
            }
        };
    });