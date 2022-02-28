import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {SimulationNodeDatum} from "d3";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const nodes: SimulationNodeDatum[] = []
    for (let i = 0; i < 10; i++) {
      nodes.push({index: i, x: Math.random() * 100, y: Math.random() * 100})
    }

    const svg = d3.select("#svg")

    const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(15))
      .force("collide", d3.forceCollide(9))

    const circles = svg.append("g")
      .attr("class", "node")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", () => 10)
      .attr("x", d => d.x || 10)
      .attr("y", d => d.y || 10);

    simulation.on("tick", () => circles.attr("transform", d => "translate(" + d.x + "," + d.y + ")"))

  }

}
