package com.webufc.backend;

import com.webufc.backend.model.Publicacion;
import com.webufc.backend.model.PublicacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/publicaciones")
@CrossOrigin(origins = "*")
public class PublicacionController {
    @Autowired
    private PublicacionRepository publicacionRepository;

    @GetMapping
    public List<Publicacion> getAllPublicaciones() {
        return publicacionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Publicacion> getPublicacionById(@PathVariable Long id) {
        return publicacionRepository.findById(id);
    }

    @PostMapping
    public Publicacion createPublicacion(@RequestBody Publicacion publicacion) {
        return publicacionRepository.save(publicacion);
    }

    @PutMapping("/{id}")
    public Publicacion updatePublicacion(@PathVariable Long id, @RequestBody Publicacion publicacion) {
        publicacion.setId(id);
        return publicacionRepository.save(publicacion);
    }

    @DeleteMapping("/{id}")
    public void deletePublicacion(@PathVariable Long id) {
        publicacionRepository.deleteById(id);
    }
} 