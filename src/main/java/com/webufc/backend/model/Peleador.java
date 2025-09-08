package com.webufc.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "peleadores")
public class Peleador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String peso;
    private int victorias;
    @Column(columnDefinition = "text")
    private String descripcion;
    private String imagen;
    private String link;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getPeso() { return peso; }
    public void setPeso(String peso) { this.peso = peso; }
    public int getVictorias() { return victorias; }
    public void setVictorias(int victorias) { this.victorias = victorias; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getImagen() { return imagen; }
    public void setImagen(String imagen) { this.imagen = imagen; }
    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
} 