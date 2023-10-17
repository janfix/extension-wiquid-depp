define([
        'CircuitPCI/interaction/runtime/js/core/component',
        'CircuitPCI/interaction/runtime/js/core/math',
    ],
    function(Component, MathUtils) {
        'use strict';

        function ComponentDoubleEnded(p) {
            var obj1 = {
                points: [p, p],
                joints: [-1, -1],
                nodes: [-1, -1],
                selected: [false, false],
                dragOrigin: [p, p],
                isVoltageSource: false,
                voltageSourceIndex: -1,
                current: 0,
                currentAnim: 0,
                loadFromString: function loadFromString(manager, loadData, reader) {
                    const joint1 = parseInt(reader.read())
                    const joint2 = parseInt(reader.read())

                    this.points[0] = { x: loadData.joints[joint1].x, y: loadData.joints[joint1].y }
                    this.points[1] = { x: loadData.joints[joint2].x, y: loadData.joints[joint2].y }
                },
                reset: function reset(manager) {
                    this.current = 0
                    this.currentAnim = 0
                },
                updateCurrentAnim: function updateCurrentAnim(manager, mult) {
                    const delta = Math.max(-0.25, Math.min(0.25, mult * (this.current * 4.5)))

                    this.currentAnim = (1 + this.currentAnim + delta) % 1
                },
                isDegenerate: function isDegenerate() {
                    return this.points[0].x == this.points[1].x && this.points[0].y == this.points[1].y
                },
                getOutgoingDirectionFromNode: function getOutgoingDirectionFromNode(index) {
                    const p1 = this.points[index]
                    const p2 = this.points[index == 0 ? 1 : 0]

                    return Math.atan2(p1.y - p2.y, p2.x - p1.x)
                },
                getHover: function getHover(pos) {
                    const pax = pos.x - this.points[0].x
                    const pay = pos.y - this.points[0].y
                    const bax = this.points[1].x - this.points[0].x
                    const bay = this.points[1].y - this.points[0].y
                    const dotPaBa = pax * bax + pay * bay
                    const dotBaBa = bax * bax + bay * bay
                    const t = Math.max(0, Math.min(1, dotPaBa / dotBaBa))

                    const fx = pax - bax * t
                    const fy = pay - bay * t
                    const distSqr = (fx * fx + fy * fy)

                    if (distSqr > 25 * 25)
                        return null

                    if (t < 0.1)
                        return { kind: "junction", index: 0, distSqr }

                    if (t > 0.9)
                        return { kind: "junction", index: 1, distSqr }

                    if (t < 0.2)
                        return { kind: "vertex", index: 0, distSqr }

                    if (t > 0.8)
                        return { kind: "vertex", index: 1, distSqr }

                    return { kind: "full", distSqr }
                },
                getLength: function getLength() {

                    const vector = {
                        x: this.points[1].x - this.points[0].x,
                        y: this.points[1].y - this.points[0].y
                    }

                    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
                },
                draw: function draw(manager, ctx) {
                    ctx.save()

                    ctx.strokeStyle = "#eeeeee"

                    ctx.beginPath()
                    ctx.arc(this.points[0].x, this.points[0].y, 2, 0, Math.PI * 2)
                    ctx.moveTo(this.points[0].x, this.points[0].y)
                    ctx.lineTo(this.points[1].x, this.points[1].y)
                    ctx.arc(this.points[1].x, this.points[1].y, 2, 0, Math.PI * 2)
                    ctx.stroke()

                    ctx.restore()
                },
                drawPolarisationPlus : function drawPolarisationPlus(manager, ctx, symbolSize){
                    
                     const vector = {
                        x: this.points[1].x - this.points[0].x,
                        y: this.points[1].y - this.points[0].y
                    }
                    const vectorLen = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
                    const vectorUnit = {
                        x: vector.x / vectorLen,
                        y: vector.y / vectorLen
                    }
                   
                    const midPoint = {
                        x: this.points[0].x + vector.x / 2,
                        y: this.points[0].y + vector.y / 2
                    };



                    //Solution Basée sur un middle point
                    const brok1 = -40//Math.max(0, vectorLen / 2 - symbolSize+10)
                    const brok2 = 40//Math.min(vectorLen, vectorLen / 2 + symbolSize-10)

                   // if(vector.x >= 0 && vector.y >= 0){
                    ctx.font = "20px Arial"; // Choisissez la taille de police appropriée
                    ctx.fillStyle = '#e9e9e9'; // Choisissez la couleur appropriée
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    
                    console.log(vector)
                    if(vector.x == 0){
                        ctx.fillText("+", midPoint.x + vectorUnit.x * brok1 -10, midPoint.y + vectorUnit.y * brok1);
                        ctx.fillText("-", midPoint.x + vectorUnit.x * brok2 -10, midPoint.y + vectorUnit.y * brok2);
                    } else{
                        //Basée sur le middle Point
                        ctx.fillText("+", midPoint.x + vectorUnit.x * brok1, midPoint.y + vectorUnit.y * brok1 - 10);
                        ctx.fillText("-", midPoint.x + vectorUnit.x * brok2, midPoint.y + vectorUnit.y * brok2 -10);
                    }
                    
                },
                drawSymbolBegin: function drawSymbolBegin(manager, ctx, symbolSize) {
                    const vector = {
                        x: this.points[1].x - this.points[0].x,
                        y: this.points[1].y - this.points[0].y
                    }

                    const vectorLen = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

                    const vectorUnit = {
                        x: vector.x / vectorLen,
                        y: vector.y / vectorLen
                    }

                    const break1 = Math.max(0, vectorLen / 2 - symbolSize / 2)
                    const break2 = Math.min(vectorLen, vectorLen / 2 + symbolSize / 2)

                    ctx.save()

                    /* ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[0])) */
                    ctx.beginPath()
                    ctx.arc(this.points[0].x, this.points[0].y, 2, 0, Math.PI * 2)
                    ctx.moveTo(this.points[0].x, this.points[0].y)
                    ctx.lineTo(this.points[0].x + vectorUnit.x * break1, this.points[0].y + vectorUnit.y * break1)
                    ctx.stroke()

                    /* ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1])) */
                    ctx.beginPath()
                    ctx.arc(this.points[1].x, this.points[1].y, 2, 0, Math.PI * 2)
                    ctx.moveTo(this.points[0].x + vectorUnit.x * break2, this.points[0].y + vectorUnit.y * break2)
                    ctx.lineTo(this.points[1].x, this.points[1].y)
                    ctx.stroke()

                    ctx.translate(this.points[0].x + vector.x / 2, this.points[0].y + vector.y / 2)
                    ctx.transform(vectorUnit.x, vectorUnit.y, -vectorUnit.y, vectorUnit.x, 0, 0)
                },
                drawSymbolSetGradient: function drawSymbolSetGradient(manager, ctx, symbolSize, color1, color2) {
                    let grad = ctx.createLinearGradient(-symbolSize / 2, 0, symbolSize / 2, 0)
                    grad.addColorStop(0, color1)
                    grad.addColorStop(1, color2)
                    ctx.strokeStyle = grad
                    ctx.fillStyle = grad
                },
                drawSymbolEnd: function drawSymbolEnd(manager, ctx) {
                    ctx.restore()
                },
                /* drawPolarisationMinus : function drawPolarisationMinus(manager, ctx, symbolSize){
                    console.log("polarisation -");
                     const vector = {
                        x: this.points[1].x - this.points[0].x,
                        y: this.points[1].y - this.points[0].y
                    }
                    const vectorLen = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
                    const vectorUnit = {
                        x: vector.x / vectorLen,
                        y: vector.y / vectorLen
                    }
                    const brak1 = Math.max(0, vectorLen / 2 - symbolSize / 2)
                    const brak2 = Math.min(vectorLen, vectorLen / 2 + symbolSize / 2)
                    
                    
                    if(vector.x >= 0 && vector.y == 0){
                        console.log("X pos ou null -----  y null")
                    ctx.font = "20px Arial"; // Choisissez la taille de police appropriée
                    ctx.fillStyle = '#FF8800'; // Choisissez la couleur appropriée
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    console.log(brak1) // Il est à zéro
                    ctx.fillText("-", this.points[0].x + vectorUnit.x * brak1 + symbolSize + 15, this.points[0].y + vectorUnit.y * brak1 + symbolSize/2 -35);
                    }

                    if(vector.x >= 0 && vector.y > 0){
                    console.log("X pos ou null -----  y superieur")
                    ctx.font = "20px Arial"; // Choisissez la taille de police appropriée
                    ctx.fillStyle = '#FF8800'; // Choisissez la couleur appropriée
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    console.log(brak1)
                    var diago = 50;
                    ctx.fillText("0", this.points[0].x + vectorUnit.x * brak1 + diago, this.points[0].y + vectorUnit.y * brak1 + diago - 20);
                    ctx.fillText("-", this.points[0].x + vectorUnit.x + brak1 + symbolSize/2 +15, this.points[0].y + vectorUnit.y * (2*brak1));
                    }


                    if(vector.x > 0 && vector.y < 0){
                        console.log("X pos  -----  y negatif")
                    ctx.font = "20px Arial"; // Choisissez la taille de police appropriée
                    ctx.fillStyle = '#FF8800'; // Choisissez la couleur appropriée
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("-", this.points[0].x + vectorUnit.x * brak1 - 15, this.points[0].y + vectorUnit.y * brak1 + symbolSize/2 -15);
                    }

                    if(vector.x <= 0 && vector.y <= 0){
                        console.log("X neg ou null -----  y neg ou null")
                    ctx.font = "20px Arial"; // Choisissez la taille de police appropriée
                    ctx.fillStyle = '#FF8800'; // Choisissez la couleur appropriée
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("-", this.points[0].x + vectorUnit.x * brak2 - 15 , this.points[0].y + vectorUnit.y * brak2 + symbolSize/2 -15);
                    }    

                    if(vector.x < 0 && vector.y > 0){
                         console.log("X neg ou null  -----  y posi")
                    ctx.font = "20px Arial"; // Choisissez la taille de police appropriée
                    ctx.fillStyle = '#FF8800'; // Choisissez la couleur appropriée
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("-", this.points[0].x + vectorUnit.x * brak2 - 15 , this.points[0].y + vectorUnit.y * brak2 + symbolSize/2 -15 );
                    }    
                    console.log(vector.x, vector.y)

                }
                , */
                renderCurrent: function renderCurrent(manager, ctx) {
                    this.drawCurrent(manager, ctx, this.currentAnim, this.points[0], this.points[1])
                },
                renderHover: function renderHover(manager, ctx, hover) {
                    if (manager.debugDrawClean)
                        return

                    ctx.save()

                    const highlightSize = 20

                    ctx.lineWidth = highlightSize

                    if (hover.kind == "full") {
                        ctx.beginPath()
                        ctx.moveTo(this.points[0].x, this.points[0].y)
                        ctx.lineTo(this.points[1].x, this.points[1].y)
                        ctx.stroke()
                    }

                    if (hover.kind == "junction") {
                        ctx.beginPath()
                        ctx.arc(this.points[hover.index].x, this.points[hover.index].y, highlightSize / 2, 0, Math.PI * 2)
                        ctx.fill()
                    }

                    if (hover.kind == "vertex") {
                        let centerX = (this.points[0].x + this.points[1].x) / 2
                        let centerY = (this.points[0].y + this.points[1].y) / 2

                        for (let i = 0; i < 3; i++) {
                            centerX = (centerX + this.points[hover.index].x) / 2
                            centerY = (centerY + this.points[hover.index].y) / 2
                        }

                        ctx.beginPath()
                        ctx.moveTo(this.points[hover.index].x, this.points[hover.index].y)
                        ctx.lineTo(centerX, centerY)
                        ctx.stroke()
                    }

                    ctx.restore()
                },
                renderSelection: function renderSelection(manager, ctx) {
                    if (manager.debugDrawClean)
                        return

                    ctx.save()

                    const highlightSize = 18

                    ctx.lineWidth = highlightSize

                    if (this.selected[0] && this.selected[1]) {
                        ctx.beginPath()
                        ctx.moveTo(this.points[0].x, this.points[0].y)
                        ctx.lineTo(this.points[1].x, this.points[1].y)
                        ctx.stroke()
                    } else if (this.selected[0]) {
                        ctx.beginPath()
                        ctx.arc(this.points[0].x, this.points[0].y, highlightSize / 2, 0, Math.PI * 2)
                        ctx.fill()
                    } else if (this.selected[1]) {
                        ctx.beginPath()
                        ctx.arc(this.points[1].x, this.points[1].y, highlightSize / 2, 0, Math.PI * 2)
                        ctx.fill()
                    }

                    ctx.restore()
                },
                renderEditing: function renderEditing(manager, ctx) {
                    if (manager.debugDrawClean)
                        return

                    ctx.save()

                    const highlightSize = 20

                    ctx.lineWidth = highlightSize

                    ctx.beginPath()
                    ctx.moveTo(this.points[0].x, this.points[0].y)
                    ctx.lineTo(this.points[1].x, this.points[1].y)
                    ctx.stroke()

                    ctx.restore()
                },
                drawRatingText: function drawRatingText(manager, ctx, value, unit, xDistance = 35, yDistance = 35) {
                    ctx.font = "15px Verdana"
                    ctx.textBaseline = "middle"


                    const labelDirection = this.getOutgoingDirectionFromNode(1) + Math.PI / 2

                    const xCenter = (this.points[0].x + this.points[1].x) / 2
                    const yCenter = (this.points[0].y + this.points[1].y) / 2
                    const xOffset = xDistance * Math.cos(labelDirection)
                    const yOffset = yDistance * -Math.sin(labelDirection)

                    if (Math.abs(xOffset) < Math.abs(yOffset) * 0.1)
                        ctx.textAlign = "center"
                    else if (xOffset > 0)
                        ctx.textAlign = "left"
                    else
                        ctx.textAlign = "right"
                    const str = MathUtils.valueToStringWithUnitPrefix(value, " ") + unit
                    ctx.fillStyle = "#fff"
                    ctx.fillText(str, xCenter + xOffset, yCenter + yOffset)
                }
            }

            var obj2 = Object.create(Component.add());
            var componentDoubleEnded = Object.assign(obj2, obj1);

            return componentDoubleEnded
        }



        return {
            add: function(p) {
                return ComponentDoubleEnded(p);
            }
        };
    });