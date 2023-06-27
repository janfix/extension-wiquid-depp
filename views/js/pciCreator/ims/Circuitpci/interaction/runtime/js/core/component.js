define([],
    function() {
        'use strict';

        function Component() {
            var component = {
                points: [],
                nodes: [],
                selected: [],
                dragOrigin: [],
                isVoltageSource: false,
                voltageSourceIndex: -1,
                getSaveId: function getSaveId() { return "-" },
                getName: function getName() { return "" },
                saveToString(manager) { return "" },
                loadFromString: function loadFromString(manager, loadData, reader) {},
                reset: function reset(manager) {},
                updateCurrentAnim: function updateCurrentAnim(manager, mult) {},
                solverBegin: function solverBegin(manager, solver) {},
                solverFrameBegin: function solverFrameBegin(manager, solver) {},
                solverIterationBegin: function solverIterationBegin(manager, solver) {},
                solverIterationEnd: function solverIterationEnd(manager, solver) {},
                solverFrameEnd: function solverFrameEnd(manager, solver) {},
                isDegenerate: function isDegenerate() { return true },
                isFullySelected: function isFullySelected() {
                    for (let i = 0; i < this.selected.length; i++)
                        if (!this.selected[i])
                            return false
                    return true
                },
                isAnySelected: function isAnySelected() {
                    for (let i = 0; i < this.selected.length; i++)
                        if (this.selected[i])
                            return true

                    return false
                },
                getOutgoingDirectionFromNode: function getOutgoingDirectionFromNode(index) {
                    return 0
                },
                getHover: function getHover(pos) {
                    return null
                },
                dragStart: function dragStart() {
                    for (let i = 0; i < this.points.length; i++)
                        this.dragOrigin[i] = this.points[i]
                },
                dragMove: function dragMove(manager, deltaPos) {
                    for (let i = 0; i < this.selected.length; i++) {
                        if (this.selected[i]) {
                            this.points[i] = manager.snapPos({
                                x: this.dragOrigin[i].x + deltaPos.x,
                                y: this.dragOrigin[i].y + deltaPos.y
                            })
                        }
                    }
                },
                getBBox: function getBBox() {
                    let xMin = this.points[0].x
                    let xMax = this.points[0].x
                    let yMin = this.points[0].y
                    let yMax = this.points[0].y

                    for (let i = 1; i < this.points.length; i++) {
                        xMin = Math.min(xMin, this.points[i].x)
                        xMax = Math.max(xMax, this.points[i].x)
                        yMin = Math.min(yMin, this.points[i].y)
                        yMax = Math.max(yMax, this.points[i].y)
                    }

                    return { xMin, xMax, yMin, yMax }
                },
                endType: function endType() {
                    return "-"
                },


                getEditBox: function getEditBox(editBoxDef) {

                },


                render: function render(manager, ctx) {

                },


                renderCurrent: function renderCurrent(manager, ctx) {

                },


                renderHover: function renderHover(manager, ctx, hoverData) {

                },


                renderSelection: function renderSelection(manager, ctx) {

                },


                renderEditing: function renderEditing(manager, ctx) {

                },


                drawCurrent: function drawCurrent(manager, ctx, anim, p1, p2) {
                    /*  if (manager.debugDrawClean)
                         return
                         // Wiquid - JP - Janfix : current yellow spots neutralization 

                     ctx.save()

                     ctx.lineWidth = 8
                     ctx.lineCap = "round"
                     ctx.strokeStyle = "#ff0"

                     ctx.lineDashOffset = -47.5 * anim
                     ctx.setLineDash([2.5, 45])

                     ctx.beginPath()
                     ctx.moveTo(p1.x, p1.y)
                     ctx.lineTo(p2.x, p2.y)
                     ctx.stroke()

                     ctx.restore() */
                }


            }

            return component

        }



        return {
            add: function() {
                return Component()
            }
        };
    });