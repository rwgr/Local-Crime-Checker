<template>
  <footer class="footer">
    <div class="container">
      <p class="footer-site-link">
        The data contained on this page is provided by the UK Police via their
        public data API (under the Open Government Licence v3.0). More
        information can be found on
        <a href="https://data.police.uk/">their website</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  height: 5rem;
  /* background-color: #cce6db; */
  border-top: 6px solid #270011;
  display: flex;
  align-items: center;
}
.footer-site-link {
  text-align: start;
  margin-top: 2.5rem;
  font-size: 1.4rem;
  display: inline-block;
  margin-bottom: 1.2rem;
}
</style>
