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
                    return "r"
                },
                getName: function getName() {
                    return "Resistance"
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
                    const symbolSize = Math.min(75, this.getLength())
                    const symbolAmplitude = 12.5
                    const symbolSegments = 9
                    const symbolSegmentSize = symbolSize / symbolSegments

                    this.drawSymbolBegin(manager, ctx, symbolSize)
                        /* this.drawSymbolSetGradient(manager, ctx, symbolSize,
                            manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0])),
                            manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1]))) */

                    ctx.beginPath()
                    ctx.moveTo(-symbolSize / 2, 0)
                    ctx.lineTo(-symbolSize / 2 + symbolSegmentSize / 2, 0)

                    let segmentX = -symbolSize / 2
                    let segmentSide = 1
                    for (let i = 0; i < symbolSegments - 1; i++) {
                        segmentX += symbolSegmentSize
                        segmentSide *= -1
                        ctx.lineTo(segmentX, symbolAmplitude * segmentSide)
                    }

                    ctx.lineTo(symbolSize / 2 - symbolSegmentSize / 2, 0)
                    ctx.lineTo(symbolSize / 2, 0)
                    ctx.stroke()

                    this.drawSymbolEnd(manager, ctx)
                    this.drawRatingText(manager, ctx, this.resistance, "Ω", 25)
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