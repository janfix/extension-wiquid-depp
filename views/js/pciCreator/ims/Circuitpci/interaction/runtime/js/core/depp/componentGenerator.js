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
                    return "G"
                },
                getName: function getName() {
                    return "Generateur"
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
                    const symbolSize = Math.min(50, this.getLength())

                    const centerX = (this.points[0].x + this.points[1].x) / 2
                    const centerY = (this.points[0].y + this.points[1].y) / 2

                    
                    
                    this.drawSymbolBegin(manager, ctx, symbolSize) // dessine les connecteurs
                    this.drawSymbolEnd(manager, ctx) // dessine les connecteurs

                    this.drawPolarisationPlus(manager, ctx, symbolSize)
                   

                    

                    ctx.save()
                    ctx.translate(centerX, centerY)

                    /* ctx.strokeStyle = manager.getVoltageColor(manager.getNodeVoltage(this.nodes[1])) */

                    ctx.beginPath()
                    ctx.arc(0, 0, symbolSize / 2, 0, Math.PI * 2) //Dessine le cercle
                    ctx.stroke()

                    //console.log(centerX, centerY)
                    var vector = {dx : centerX- pos.x, dy : centerY-pos.y}
                    var t = 1;
                    //console.log(vector)
                    var newPoint = pointOnVector(this.points[1].x , this.points[1].y , vector.dx, vector.dy, t);
                    //console.log(newPoint);

                   /*  ctx.beginPath()
                    ctx.arc(-symbolSize, -3,5, 0, Math.PI * 2 );
                    ctx.fillStyle = '#000000';
                    ctx.stroke()

                    ctx.beginPath()
                    ctx.arc(symbolSize, -3,5, 0, Math.PI * 2 );
                    ctx.fillStyle = '#000000';
                    ctx.stroke() */



                    function pointOnVector(x1, y1, dx, dy, t) {
                    // Calculer les nouvelles coordonnées
                    var newX = x1 + dx * t;
                    var newY = y1 + dy * t;

                    // Retourner le nouveau point
                    return {x: newX, y: newY};}

                    


                    ctx.font = "bolder  30px Arial";
                    ctx.fillStyle = '#FF8800';
                    const textWidth = ctx.measureText("G").width;
                    // Ajustement des coordonnées x et y pour centrer le texte
                    const textX = -symbolSize / 8 + 7;
                    const textY = -symbolSize / 8 + 7; // Vous pouvez ajuster cette valeur selon vos besoins

                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("G", textX, textY);


                     // Dessiner le "+"
                   /*  ctx.font = "20px Arial"; // Choisissez la taille de police appropriée
                    ctx.fillStyle = '#000'; // Choisissez la couleur appropriée
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    var plusX = symbolSize / 2 + 10; // 10 est la marge depuis le bord du cercle, ajustez comme nécessaire
                    var plusY = 0;
                    ctx.fillText("-", plusX, plusY);

                    // Dessiner le "-"
                    var minusX = -symbolSize / 2 - 10; // 10 est la marge depuis le bord du cercle, ajustez comme nécessaire
                    var minusY = 0;
                    ctx.fillText("+", minusX, minusY); */




                    this.drawSymbolEnd(manager, ctx)
                        //this.drawRatingText(manager, ctx, this.resistance, "Ω", 25)
                }


            }
            var obj2 = Object.create(ComponentDoubleEnded.add(pos));
            console.log(obj2)
            console.log(obj2.points)
            var ComponentResistor = Object.assign(obj2, obj1);


            




            return ComponentResistor;

        }



        return {
            add: function(pos) {
                return componentResistor(pos)
            }
        };
    });