package com.webufc.backend;

import com.webufc.backend.model.Peleador;
import com.webufc.backend.model.PeleadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/peleadores")
@CrossOrigin(origins = "*")
public class PeleadorController {
    @Autowired
    private PeleadorRepository peleadorRepository;

    @GetMapping
    public List<Peleador> getAllPeleadores() {
        return peleadorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Peleador> getPeleadorById(@PathVariable Long id) {
        return peleadorRepository.findById(id);
    }

    @PostMapping
    public Peleador createPeleador(@RequestBody Peleador peleador) {
        return peleadorRepository.save(peleador);
    }

    @PutMapping("/{id}")
    public Peleador updatePeleador(@PathVariable Long id, @RequestBody Peleador peleador) {
        peleador.setId(id);
        return peleadorRepository.save(peleador);
    }

    @DeleteMapping("/{id}")
    public void deletePeleador(@PathVariable Long id) {
        peleadorRepository.deleteById(id);
    }
} 