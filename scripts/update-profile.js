#!/usr/bin/env node

/**
 * Script para actualizar automáticamente el perfil de GitHub
 * Genera estadísticas y actualiza el README.md
 */

const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
  username: 'gerardoojeda47',
  theme: 'tokyonight',
  showStats: true,
  showLanguages: true,
  showStreak: true
};

// Función para generar estadísticas
function generateStats() {
  const stats = {
    totalRepos: 49,
    totalStars: 1,
    totalCommits: 124,
    totalFollowers: 0,
    totalFollowing: 2,
    languages: {
      'JavaScript': 60,
      'HTML': 20,
      'CSS': 15,
      'Python': 5
    }
  };
  
  return stats;
}

// Función para actualizar README
function updateREADME() {
  const readmePath = path.join(__dirname, '..', 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    console.log('❌ README.md no encontrado');
    return;
  }
  
  let content = fs.readFileSync(readmePath, 'utf8');
  const stats = generateStats();
  
  // Actualizar estadísticas
  const statsRegex = /<!-- STATS_START -->[\s\S]*?<!-- STATS_END -->/g;
  const newStats = `<!-- STATS_START -->
## 📊 Estadísticas Actualizadas

- 🏆 **${stats.totalRepos}** repositorios
- ⭐ **${stats.totalStars}** estrellas
- 📝 **${stats.totalCommits}** commits
- 👥 **${stats.totalFollowers}** seguidores
- 👤 **${stats.totalFollowing}** siguiendo

Última actualización: ${new Date().toLocaleString('es-ES')}
<!-- STATS_END -->`;
  
  if (statsRegex.test(content)) {
    content = content.replace(statsRegex, newStats);
  } else {
    content += `\n\n${newStats}`;
  }
  
  fs.writeFileSync(readmePath, content, 'utf8');
  console.log('✅ README.md actualizado exitosamente');
}

// Función principal
function main() {
  console.log('🚀 Iniciando actualización del perfil...');
  
  try {
    updateREADME();
    console.log('🎉 Perfil actualizado correctamente');
  } catch (error) {
    console.error('❌ Error al actualizar el perfil:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { generateStats, updateREADME };
