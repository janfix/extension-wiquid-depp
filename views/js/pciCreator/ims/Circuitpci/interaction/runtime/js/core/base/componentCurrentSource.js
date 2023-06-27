define([
        'CircuitPCI/interaction/runtime/js/core/componentDoubleEnded',
        'CircuitPCI/interaction/runtime/js/core/math',
    ],
    function(ComponentDoubleEnded, MathUtils) {
        'use strict';

        function componentCurrentSource(pos) {

            var obj1 = {
                currentSetting: 0.01,
                getSaveId: function getSaveId() {
                    return "i"
                },
                getName: function getName() {
                    return "Current Source"
                },


                saveToString: function saveToString(manager) {
                    return this.joints[0] + "," + this.joints[1] + "," + MathUtils.valueToStringWithUnitPrefix(this.currentSetting) + ","
                },


                loadFromString: function loadFromString(manager, loadData, reader) {
                    // super.loadFromString(manager, loadData, reader)
                    this.currentSetting = reader.readNumber()
                },


                solverBegin: function solverBegin(manager, solver) {
                    solver.stampCurrentSource(this.nodes[0], this.nodes[1], this.currentSetting)
                },


                solverIterationEnd: function solverIterationEnd(manager, solver) {
                    this.current = this.currentSetting
                },


                getEditBox: function getEditBox(editBoxDef) {
                    editBoxDef.addNumberInput("Current", "A", this.currentSetting, (x) => { this.currentSetting = x })
                },


                render: function render(manager, ctx) {
                    const symbolSize = Math.min(50, this.getLength())

                    this.drawSymbolBegin(manager, ctx, symbolSize)
                        /* this.drawSymbolSetGradient(manager, ctx, symbolSize,
                            manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0])),
                            manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1]))) */

                    const centerX = (this.nodes[0].x + this.nodes[1].x) / 2
                    const centerY = (this.nodes[0].y + this.nodes[1].y) / 2

                    ctx.beginPath()
                    ctx.arc(0, 0, symbolSize / 2, 0, Math.PI * 2)
                    ctx.stroke()

                    ctx.beginPath()
                    ctx.moveTo(-symbolSize * 0.3, 0)
                    ctx.lineTo(symbolSize * 0.2, 0)
                    ctx.stroke()

                    ctx.beginPath()
                    ctx.moveTo(symbolSize * 0.4, 0)
                    ctx.lineTo(symbolSize * 0.2, -symbolSize * 0.2)
                    ctx.lineTo(symbolSize * 0.2, symbolSize * 0.2)
                    ctx.lineTo(symbolSize * 0.4, 0)
                    ctx.fill()

                    this.drawSymbolEnd(manager, ctx)
                    this.drawRatingText(manager, ctx, this.current, "A")
                }

            };
            var obj2 = Object.create(ComponentDoubleEnded.add(pos));
            var ComponentCurrentSource = Object.assign(obj2, obj1);

            return ComponentCurrentSource;

        }



        return {
            add: function(pos) {
                return componentCurrentSource(pos)
            }
        };
    });